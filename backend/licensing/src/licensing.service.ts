import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { AuthenticationErrorCode } from "./models/error-codes";

@Injectable()
export class LicensingService {
    private readonly xmlParser = new XMLParser({
        ignoreAttributes: true,
        allowBooleanAttributes: false,
        processEntities: false,
        ignoreDeclaration: true,
    });

    private readonly logger = new Logger(LicensingService.name);

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
     * @param machineId machine id that acquired the lock
     */
    acquireLock(licenseId: string, machineId: string) {
        // TODO execute a transaction to guarantee ACIDness
        throw new Error("Unimplemented!");
    }

    /**
     * Releases the lock the given machine holds for the given license
     * 
     * Error is thrown if lock has not been acquired
     * 
     * This is an atomic operation
     * @param licenseId license id
     * @param machineId machine id that will release the lock
     */
    releaseLock(licenseId: string, machineId: string) {
        // TODO execute a transaction to guarantee ACIDness
        throw new Error("Unimplemented!");
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
     * @param email user email
     * @returns true if that email is authorized to generate licenses, false otherwise
     */
    async canGenerateLicense(email: string): Promise<boolean> {
        // TODO query database, return true if email is found in `generator` database
        return false;
    }

    /**
     * 
     * @param email generator's email
     * @returns generator's information or null if no generator is associated with that email
     */
    async generatorInfo(email: string): Promise<object> {
        // TODO query database and retrieve generator info
        return {};
    }

    /**
     * Generates a new license
     * @param generatorId id of the person that generates this license
     * @returns the license ID
     */
    async generateLicense(generatorId: string): Promise<string> {
        // TODO insert to database and retrieve license id
        return "";
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
