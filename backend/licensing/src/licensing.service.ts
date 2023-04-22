import { Injectable, Logger } from "@nestjs/common";
import { XMLParser } from "fast-xml-parser";
import { AuthenticationErrorCode } from "./models/error-codes";

@Injectable()
export class LicensingService {
    private readonly xmlParser = new XMLParser({
        ignoreAttributes: true,
        allowBooleanAttributes: false,
        processEntities: false,
        ignoreDeclaration: true
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
            if (!createdAt || isNaN(createdAt.getTime()))
                return AuthenticationErrorCode.E_INVALID;

            const expiresAtSplit = Buffer.from(lic.LicenseEntity.Signature, "base64")
                .toString()
                .split('/')
                .map(s => parseInt(s));
            if (expiresAtSplit.length !== 3 || expiresAtSplit.some(n => isNaN(n))) // validate all 3 numbers in date are actually numbers
                return AuthenticationErrorCode.E_INVALID;

            const expiresAt = new Date();
            expiresAt.setUTCMonth(expiresAtSplit[0] - 1); // 0 => january, 1 => feb
            expiresAt.setUTCDate(expiresAtSplit[1]);
            expiresAt.setUTCFullYear(expiresAtSplit[2]);
            expiresAt.setUTCHours(0, 0, 0, 0);

            const now = new Date();
            if (expiresAt.getTime() < now.getTime()) // license has expired
                return AuthenticationErrorCode.E_EXPIRED;

            if (createdAt.getTime() > now.getTime()) // created in the future
                return AuthenticationErrorCode.E_INVALID;

            // validate required keys
            const requiredKeys = ["UID", "LicensedTo"];
            const containsAllRequiredKeys = requiredKeys.every(k => !!lic.LicenseEntity[k]); // all values should be truthy

            if (!containsAllRequiredKeys)
                return AuthenticationErrorCode.E_INVALID;
        } catch (e) {
            return AuthenticationErrorCode.E_INVALID;
        }

        return null;
    }

    getHello(): string {
        return "Hello World!";
    }

    /**
     * Get license information from the database
     * @param id license UUID
     * @returns the license information associated to the given license id
     */
    getLicenseById(id: string) {
        throw new Error("Unimplemented!");
    }
}

interface OldLicenseModel {
    LicenseEntity: {
        UID: string;
        Type: string;
        CreateDateTime: string;
        Signature: string;
        LicensedTo: string;
    }
}