import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class AcquireLockDto {
    @ApiProperty({
        description: "License UUID",
        example: "51495a1b-d964-474b-85f9-8a2d712fccb5",
    })
    @IsUUID(4)
    licenseId: string;

    @ApiProperty({
        description: "UID of the client that will acquire the lock"
    })
    @IsString()
    clientId: string;
}