import { ApiProperty } from "@nestjs/swagger";
import { IntegrationsSchema } from "../models/integrations.entity";

export class IntegrationResponse {
    @ApiProperty({ description: "integration schema" })
    integration: IntegrationsSchema;
}
