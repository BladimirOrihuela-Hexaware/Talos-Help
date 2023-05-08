import { ApiProperty } from "@nestjs/swagger";

export class LicenseGenerationResponse {
    @ApiProperty({
        description: "License UUID",
        example: "<TODO>",
    })
    licenseId: string;
}
