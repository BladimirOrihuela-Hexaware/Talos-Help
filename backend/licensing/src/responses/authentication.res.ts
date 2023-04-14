import { ApiProperty } from "@nestjs/swagger";

export class AuthenticationResponse {
    @ApiProperty({ description: "JWT generated for the user" })
    jwt: string;
}
