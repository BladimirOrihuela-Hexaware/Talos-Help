import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AuthenticateDto {
    @ApiProperty({
        description: "License UUID",
        example: "5AH3XA-18A02WB-1UNDF9B-1TELAMA",
    })
    @IsString()
    @Length(30, 30)
    license: string;
}
