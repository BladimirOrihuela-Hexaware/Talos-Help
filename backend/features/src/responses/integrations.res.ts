import { ApiProperty } from "@nestjs/swagger";
import { IntegrationBase } from "../models/integrationBase.entity";

export class IntegrationsResponse {
    @ApiProperty({ description: "List of integrations" })
    integrations: IntegrationBase[];
}
