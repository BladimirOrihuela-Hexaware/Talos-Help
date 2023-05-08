import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AcquireLockDto {
    @ApiProperty({
        description: "License UUID",
        example: "<TODO insert example here>",
    })
    @IsString()
    licenseId: string;

    @ApiProperty({
        description: "Client UID that will acquire the lock",
        example: "<TODO insert example here>"
    })
    @IsString()
    clientId: string;
}