import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AuthenticateDto {
    @ApiProperty({
        description: "License UUID",
        example: "<TODO insert example here>",
    })
    @IsString()
    @Length(30, 30)
    license: string;
}
