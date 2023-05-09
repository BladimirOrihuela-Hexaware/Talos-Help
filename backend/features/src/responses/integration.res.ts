import { ApiProperty } from "@nestjs/swagger";
import { IntegrationsSchema } from "../models/integrations.entity";
import { GenRocket } from "../models/genrocket.entity";
export class IntegrationResponse {
    @ApiProperty({ description: "integration schema" })
    integration: GenRocket | any; //replace any with other integration entity
}
