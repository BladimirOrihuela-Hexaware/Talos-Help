import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Put,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiInternalServerErrorResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GenerateLicenseDto } from "../dto/generate-license.dto";
import { LicensingService } from "../licensing.service";
import { LicenseGenerationResponse } from "../models/license-generation.response";

@Controller("admin")
export class AdminController {
    constructor(private readonly licensingService: LicensingService, private readonly configService: ConfigService) {}

    @Put("generate")
    @ApiTags("create")
    @ApiResponse({ status: 201, description: "License was successfully generated", type: LicenseGenerationResponse })
    @ApiResponse({ status: 403, description: "You're not authorized to generate licenses" })
    @ApiInternalServerErrorResponse()
    async generate(@Body() body: GenerateLicenseDto): Promise<LicenseGenerationResponse> {
        // TODO guard with OAuth2 and Microsoft
        let email = "replace with email from oauth2";
        if (this.configService.get("NODE_ENV") === "test") email = "test-generator@testing.test";

        if (body.expiration.getTime() < Date.now())
            throw new HttpException("Expiration date is in the past", HttpStatus.BAD_REQUEST);

        let generator: { id: string; email: string };
        try {
            generator = await this.licensingService.generatorInfo(email);
            if (!generator) throw new UnauthorizedException();
        } catch (e) {
            console.error(`Failed to query generator information for email ${email}`, e);
            throw new InternalServerErrorException();
        }

        try {
            const licenseId = await this.licensingService.generateLicense(
                generator.id,
                body.orgId,
                body.projName,
                body.maxClients,
                body.expiration,
                body.clientTimeout,
            );
            return { licenseId: licenseId };
        } catch (e) {
            console.error("Error while generating license", e);
            throw new InternalServerErrorException();
        }
    }
}
