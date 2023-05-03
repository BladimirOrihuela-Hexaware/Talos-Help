import { BasicIntegration } from "@atptalos/common";
import { ApiProperty } from "@nestjs/swagger";

export class IntegrationBase implements BasicIntegration {
    @ApiProperty({ required: true, description: "Integration Title" })
    title: string;

    @ApiProperty({ required: true, description: "Description" })
    description: string;

    @ApiProperty({ required: true, description: "Logo url" })
    logo: string;
}
