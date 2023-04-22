import { Body, Controller, ForbiddenException, HttpCode, HttpException, HttpStatus, Logger, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
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

    constructor(
        private readonly licensingService: LicensingService,
        private readonly jwtService: JwtService
    ) {}

    @Post("auth-old")
    @ApiTags("read", "deprecated")
    @ApiOperation({ description: "DEPRECATED: Don't use this, old licenses are VERY VERY hackable" })
    @ApiResponse({ status: 403, description: "Forbidden. License is invalid or it expired", type: AuthenticationResponse })
    @ApiResponse({
        status: 200,
        description: "Successful authentication",
        type: AuthenticationResponse
    })
    @HttpCode(200)
    public async authenticateOld(@Body() authenticateDto: OldAuthenticateDto): Promise<AuthenticationResponse> {
        let res: AuthenticationResponse;

        const license = authenticateDto.license;
        const err = this.licensingService.isOldLicenseValid(license);
        if (err) {
            switch(err) {
                case AuthenticationErrorCode.E_INVALID:
                case AuthenticationErrorCode.E_UNKNOWN:
                    this.logger.warn(`${err} when validating license ${license}`);
            }

            res = { jwt: '', success: false, errCode: err };
            throw new ForbiddenException(res);
        }

        const jwtPayload: JWTPayload = {
            // Since this is an old license, it doesn't have an id, so just set a dummy value to indicate 
            licenseId: "OLD" //this.licensingService.getIdFromOldLicense(license)
        };
        const jwt = await this.jwtService.signAsync(jwtPayload);
        return { jwt, success: true };
    }

    public async authenticate(@Body() authenticateDto: AuthenticateDto): Promise<AuthenticationResponse> {
        // TODO check if license is given as parameter
        // TODO check if license is included in body
        return {} as AuthenticationResponse;
    }

    @Post("generate")
    @ApiTags("create")
    @ApiResponse({ status: 201, description: "License was successfully created" })
    @ApiResponse({
        status: 400,
        description: "There is a problem. It's very likely that a license is already associated with that client",
    })
    generate(@Body() GenerateLicenseDto: GenerateLicenseDto): LicenseGenerationResponse {
        throw new HttpException("This is still work in progress", HttpStatus.NOT_IMPLEMENTED);

        // TODO generate license...
    }
}
