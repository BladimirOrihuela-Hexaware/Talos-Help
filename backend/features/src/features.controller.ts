import { Controller, Get, Param } from "@nestjs/common";
import { FeaturesService } from "./features.service";
import { ApiResponse, ApiTags, ApiParam, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { NotFoundError, BadRequestError } from "@atptalos/common";
import { IntegrationsDto } from "./dto/integrationsDto.dto";
import { IntegrationsResponse, IntegrationResponse } from "./responses/integrations.res";

@Controller("integrations")
export class IntegrationsController {
    constructor(private readonly featuresService: FeaturesService) {}

    @Get()
    @ApiTags("integrations")
    @ApiExtraModels(IntegrationsDto)
    @ApiResponse({
        status: 200,
        description: "Integrations details",
        schema: { $ref: getSchemaPath(IntegrationsDto) },
    })
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    @ApiResponse({ status: 200, description: "List of all integrations" })
    getIntegrations(): IntegrationsResponse {
        const data = this.featuresService.getIntegrations();
        return { integrations: data };
    }
}

@Controller("integration")
export class IntegrationController {
    constructor(private readonly featuresService: FeaturesService) {}

    @Get(":id")
    @ApiTags("integrations")
    @ApiParam({
        name: "id",
        description: "Integration Id",
        required: true,
        allowEmptyValue: false,
        example: "genrocket",
    })
    @ApiResponse({
        status: 200,
        description: "Integration page details",
    })
    @ApiResponse({ status: 404, description: "integration ID not found" })
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    getIntegration(@Param() params): IntegrationResponse {
        if (params.id === "{id}") throw new BadRequestError("Id is required");
        const id = params.id as string;

        const data = this.featuresService.getIntegration(id.toLocaleLowerCase());
        if (!data) throw new NotFoundError();
        return { integration: data };
    }
}
