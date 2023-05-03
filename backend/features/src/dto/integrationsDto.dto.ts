import { ApiProperty } from "@nestjs/swagger";
import { IntegrationBase } from "../models/integrationBase.entity";

export class IntegrationsDto {
    @ApiProperty({
        description: "Integrations list",
        example: [{ title: "integration title", description: "integration description", logo: "webp url" }],
    })
    integrations: IntegrationBase[];
}
