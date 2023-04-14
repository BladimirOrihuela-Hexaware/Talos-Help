import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { GenerateLicenseDto } from "./dto/generate-license.dto";
import { LicensingService } from "./licensing.service";
import { AuthenticationResponse } from "./responses/authentication.res";
import { LicenseGenerationResponse } from "./responses/license-generation.res";

@Controller()
export class LicensingController {
    constructor(private readonly licensingService: LicensingService) {}

    @Post("auth")
    @ApiTags("read")
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    @ApiResponse({ status: 200, description: "Successful authentication", type: AuthenticationResponse })
    authenticate(@Body() authenticateDto: AuthenticateDto): AuthenticationResponse {
        throw new HttpException("This is still work in progress", HttpStatus.NOT_IMPLEMENTED);

        // TODO what if we remove this endpoint
        //  and move all jwt generation/verification to the gateway?

        const license = authenticateDto.license;
        // TODO retrieve license info from database (if any)
        //  then, validate license is active
        //  then, generate JWT
        //this.licensingService.getLicenseInfo(license);
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
