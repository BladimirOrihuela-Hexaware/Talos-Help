import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    InternalServerErrorException,
    Logger,
    NotImplementedException,
    Post,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { GenerateLicenseDto } from "./dto/generate-license.dto";
import { OldAuthenticateDto } from "./dto/old-authenticate.dto";
import { LicensingService } from "./licensing.service";
import { AuthenticationResponse } from "./models/authentication.response";
import { AuthenticationErrorCode } from "./models/error-codes";
import { JWTPayload } from "./models/jwt-payload";
import { LicenseGenerationResponse } from "./models/license-generation.response";

@Controller()
export class LicensingController {
    private readonly logger = new Logger(LicensingController.name);

    constructor(private readonly licensingService: LicensingService, private readonly jwtService: JwtService) {}

    @Get("microsoft")
    @ApiOperation({ description: "Entrypoint for microsoft authentication" })
    public microsoftEntrypoint() {
        throw new NotImplementedException();
    }
    
    @Get("microsoft/callback")
    @ApiOperation({ description: "Callback from OAuth2" })
    public microsoftCallback() {
        throw new NotImplementedException();
    }

    @Post("auth-old")
    @ApiTags("read", "deprecated")
    @ApiOperation({ description: "DEPRECATED: Don't use this, old licenses are VERY VERY hackable" })
    @ApiResponse({ status: 403, description: "Forbidden. License is invalid or expired", type: AuthenticationResponse })
    @ApiResponse({
        status: 200,
        description: "Successful authentication",
        type: AuthenticationResponse,
    })
    @HttpCode(200)
    public async authenticateOld(@Body() authenticateDto: OldAuthenticateDto): Promise<AuthenticationResponse> {
        let res: AuthenticationResponse;

        const license = authenticateDto.license;
        const err = this.licensingService.isOldLicenseValid(license);
        if (err) {
            switch (err) {
                case AuthenticationErrorCode.E_INVALID:
                case AuthenticationErrorCode.E_UNKNOWN:
                    this.logger.warn(`${err} when validating license ${license}`);
            }

            res = { jwt: "", success: false, errCode: err };
            throw new ForbiddenException(res);
        }

        const jwtPayload: JWTPayload = {
            // Since this is an old license, it doesn't have an id, so just set a dummy value to indicate
            licenseId: "OLD", //this.licensingService.getIdFromOldLicense(license)
        };
        const jwt = await this.jwtService.signAsync(jwtPayload);
        return { jwt, success: true };
    }

    @Post("auth")
    @ApiTags("read")
    @ApiResponse({ status: 403, description: "Forbidden. License is invalid or expired", type: AuthenticationResponse })
    @ApiResponse({
        status: 200,
        description: "Successful authentication",
        type: AuthenticationResponse,
    })
    @HttpCode(200)
    public async authenticate(@Body() authenticateDto: AuthenticateDto): Promise<AuthenticationResponse> {
        // TODO mix sso and license id
        return {} as AuthenticationResponse;
    }
}
