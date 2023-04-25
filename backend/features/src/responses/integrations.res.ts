import { ApiProperty } from "@nestjs/swagger";
import { IntegrationBase } from "../entities/integration_base";
import { Integration } from "src/entities/integrations";

export class IntegrationsResponse {
    @ApiProperty({ description: "List of integrations" })
    integrations: IntegrationBase[];
}

export class IntegrationResponse {
    @ApiProperty({ description: "integration schema" })
    integration: Integration;
}
