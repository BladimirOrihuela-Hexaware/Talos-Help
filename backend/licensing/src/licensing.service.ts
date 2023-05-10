import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { AuthenticationErrorCode } from "./models/error-codes";
import { PrismaClient, Prisma } from "@prisma/client";

const spOutValues = ["SUCCESS", "E_LIMIT_REACHED", "E_EXPIRED", "E_ALREADY_ACQUIRED", "E_NOT_ACQUIRED"] as const;
const spOutValuesMap = spOutValues.reduce((prev: Map<SPOut, boolean>, curr: SPOut) => prev.set(curr, true), new Map<SPOut, boolean>());
export type SPOut = typeof spOutValues[number];

@Injectable()
export class LicensingService {
    private readonly xmlParser = new XMLParser({
        ignoreAttributes: true,
        allowBooleanAttributes: false,
        processEntities: false,
        ignoreDeclaration: true,
    });

    private readonly logger = new Logger(LicensingService.name);

    private readonly prisma = new PrismaClient();

    /**
     * If client doesn't notify it is still alive after this number of minutes, it should be considered dead
     */
    public static readonly DEFAULT_CLIENT_TIMEOUT = 5;

    /**
     * This method doesn't validate the license!
     *
     * @param license old license
     * @returns the UID from the license
     * @see isOldLicenseValid
     */
    public getIdFromOldLicense(license: string): string {
        const lic: OldLicenseModel = this.xmlParser.parse(license);
        return lic.LicenseEntity.UID;
    }

    /**
     * Checks if an old license (those consisting of a simple XML file) is valid or not
     * by simply verifying it's valid xml, has some specific nodes, and current date (UTC-00:00) < expiration date (UTC-00:00)
     * @param license old license to be validated
     */
    public isOldLicenseValid(license: string): AuthenticationErrorCode | null {
        try {
            const lic: OldLicenseModel = this.xmlParser.parse(license);

            // parse and validate dates
            const createdAt = new Date(lic.LicenseEntity.CreateDateTime);
            if (!createdAt || isNaN(createdAt.getTime())) return AuthenticationErrorCode.E_INVALID;

            const expiresAtSplit = Buffer.from(lic.LicenseEntity.Signature, "base64")
                .toString()
                .split("/")
                .map((s) => parseInt(s));
            if (expiresAtSplit.length !== 3 || expiresAtSplit.some((n) => isNaN(n)))
                // validate all 3 numbers in date are actually numbers
                return AuthenticationErrorCode.E_INVALID;

            const expiresAt = new Date();
            expiresAt.setUTCMonth(expiresAtSplit[0] - 1); // 0 => january, 1 => feb
            expiresAt.setUTCDate(expiresAtSplit[1]);
            expiresAt.setUTCFullYear(expiresAtSplit[2]);
            expiresAt.setUTCHours(0, 0, 0, 0);

            const now = new Date();
            if (expiresAt.getTime() < now.getTime())
                // license has expired
                return AuthenticationErrorCode.E_EXPIRED;

            if (createdAt.getTime() > now.getTime())
                // created in the future
                return AuthenticationErrorCode.E_INVALID;

            // validate required keys
            const requiredKeys = ["UID", "LicensedTo"];
            const containsAllRequiredKeys = requiredKeys.every((k) => !!lic.LicenseEntity[k]); // all values should be truthy

            if (!containsAllRequiredKeys) return AuthenticationErrorCode.E_INVALID;
        } catch (e) {
            return AuthenticationErrorCode.E_INVALID;
        }

        return null;
    }

    /**
     * Acquires a lock on the license
     * 
     * Error is thrown if lock is already acquired or all available locks for the given license have already been acquired
     * 
     * This is an atomic operation
     * @param licenseId license id
     * @param clientId client id that acquired the lock
     */
    async acquireLock(licenseId: string, clientId: string): Promise<SPOut> {
        // TODO garbage-collect dead clients

        let outMsg: string;
        try {
            const res = await this.prisma.$queryRaw`CALL acquire_lock(${licenseId}::uuid, ${clientId}::VARCHAR, '');`;
            outMsg = res[0].out_msg;
        } catch (e) {
            console.error("Error while trying to acquire a lock", e);
            throw e;
        }

        outMsg = outMsg.toUpperCase();
        if (!spOutValuesMap.has(outMsg as SPOut)) {
            console.error(`Stored procedure didn't return something valid. Received: ${outMsg}. Expected one of: ${spOutValues}`);
            throw new Error("Bad programming");
        }

        return outMsg as SPOut;
    }

    /**
     * Releases the lock the given client holds for the given license
     * 
     * Error is thrown if lock has not been acquired
     * 
     * This is an atomic operation
     * @param licenseId license id
     * @param clientId client id that will release the lock
     */
    async releaseLock(licenseId: string, clientId: string): Promise<SPOut> {
        let outMsg: string;
        try {
            const res = await this.prisma.$queryRaw`CALL release_lock(${licenseId}::uuid, ${clientId}::VARCHAR, '');`;
            outMsg = res[0].out_msg;
        } catch (e) {
            console.error("Error while trying to release a lock", e);
            throw e;
        }

        outMsg = outMsg.toUpperCase();
        if (!spOutValuesMap.has(outMsg as SPOut)) {
            console.error(`Stored procedure didn't return something valid. Received: ${outMsg}. Expected one of: ${spOutValues}`);
            throw new Error("Bad programming");
        }

        return outMsg as SPOut;
    }

    /**
     * Get license information from the database
     * @param id license UUID
     * @returns the license information associated to the given license id
     */
    getLicenseById(id: string) {
        throw new Error("Unimplemented!");
    }

    /**
     * 
     * @param email generator's email
     * @returns generator's information or null if no generator is associated with that email (or it's not active)
     */
    async generatorInfo(email: string): Promise<{id: string; email: string}> {
        const res = await this.prisma.generator.findFirst({
            select: {
                id: true,
                email: true,
            },
            where: {
                email: email,
                active: true,
            }
        });

        return res;
    }

    /**
     * Generates a new license
     * @param generatorId id of the person that generates this license
     * @param projName project name
     * @param orgId organization id
     * @param maxLocks maximum number of locks that can be acquired simultaneously (max # of clients that can use TALOS at the same time)
     * @param expiration license expiration date
     * @param clientTimeout default is {@link LicensingService.DEFAULT_CLIENT_TIMEOUT}
     * @returns the license ID
     */
    async generateLicense(
        generatorId: string,
        orgId: string,
        projName: string,
        maxLocks: number,
        expiration: Date | string,
        clientTimeout: number = LicensingService.DEFAULT_CLIENT_TIMEOUT
    ): Promise<string> {
        const res = await this.prisma.license.create({
            select: {
                id: true
            },
            data: {
                name: projName,
                max_clients: maxLocks,
                expiration: expiration,
                client_timeout: clientTimeout,
                generator_id: generatorId,
                org_id: orgId
            }
        });
        
        return res.id;
    }

    async handleKeepAlive(licenseId: string, clientId: string) {
        const res = await this.prisma.license_usage.update({
            select: {
                last_ka_received_at: true
            },
            data: {
                last_ka_received_at: new Date()
            },
            where: {
                license_id_client_id: {
                    license_id: licenseId,
                    client_id: clientId
                }
            }
        });
    }
}

interface OldLicenseModel {
    LicenseEntity: {
        UID: string;
        Type: string;
        CreateDateTime: string;
        Signature: string;
        LicensedTo: string;
    };
}
