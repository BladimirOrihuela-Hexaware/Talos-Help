import { ApiProperty } from "@nestjs/swagger";

export class LicenseGenerationResponse {
    @ApiProperty({
        description: "License UUID",
        example: "5AH3XA-18A02WB-1UNDF9B-1TELAMA",
    })
    licenseId: string;

    @ApiProperty({
        description: "License (base64-encoded). This is meant to be stored in a file",
    })
    license: string;
}
