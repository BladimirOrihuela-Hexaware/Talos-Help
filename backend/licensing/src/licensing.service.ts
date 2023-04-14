import { Injectable } from "@nestjs/common";

@Injectable()
export class LicensingService {
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
