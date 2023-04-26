import { ApiProperty } from "@nestjs/swagger";
import { AuthenticationErrorCode } from "./error-codes";

export class AuthenticationResponse {
    @ApiProperty({ description: "JWT generated for the user" })
    jwt: string;

    @ApiProperty({ description: "True if authentication was successful, false otherwise" })
    success: boolean;

    @ApiProperty({
        description: "Specifies the reason for unsuccessful authentication",
        enum: AuthenticationErrorCode,
        required: false,
    })
    errCode?: AuthenticationErrorCode;
}
