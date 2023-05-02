import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class OldAuthenticateDto {
    @ApiProperty({
        description: "License",
        required: true,
        example: '<?xml version="1.0" encoding="utf-16"?><LicenseEntity>....</LicenseEntity>',
    })
    @IsString()
    license: string;
}
