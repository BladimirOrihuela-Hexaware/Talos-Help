import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class GenerateLicenseDto {
    @ApiProperty({
        description: "Client's name",
        example: "Mariana Ruzzi",
    })
    @IsString()
    @Length(2, 255)
    name: string;

    @ApiProperty({
        description: "Some description...",
    })
    email: string;

    @ApiProperty({
        description: "Some description...",
    })
    client: string;

    @ApiProperty({
        description: "Some description...",
    })
    uid: string;
}
