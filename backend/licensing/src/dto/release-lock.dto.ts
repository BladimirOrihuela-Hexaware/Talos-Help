import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class ReleaseLockDto {
    @ApiProperty({
        description: "License UUID",
        example: "<TODO insert example here>",
    })
    @IsString()
    licenseId: string;

    @ApiProperty({
        description: "Machine UID that will release the lock",
        example: "<TODO insert example here>"
    })
    @IsString()
    machineId: string;
}