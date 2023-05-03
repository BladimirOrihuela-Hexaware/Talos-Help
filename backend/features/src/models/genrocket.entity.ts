import { IGenrocket, Step } from "@atptalos/common";
import { IntegrationBase } from "./integrationBase.entity";
import { ApiProperty } from "@nestjs/swagger";

export class GenRocket extends IntegrationBase implements IGenrocket {
    @ApiProperty({ required: false, description: "Prerequisites to use genrocket" })
    prerequisites: { desc: string; list: string[] };

    @ApiProperty({ required: false, description: "connect to genrocket details" })
    connect: Step[];

    @ApiProperty({ required: false, description: "link domain instructions" })
    linkDomain: { desc: string; steps: Step[] };

    @ApiProperty({ required: false, description: "instructions on how to upload attributes to genrocket" })
    uploadAtts: { desc: string; alert: string; steps: Step[] };

    @ApiProperty({ required: false, description: "instructions on how to get attributes from genrocket" })
    getAtts: { desc: string; steps: Step[]; note: string };

    @ApiProperty({ required: false, description: "how to unlink test" })
    unlink: { steps: Step[]; note: string };

    @ApiProperty({ required: false, description: "how to unlink project" })
    unlinkProject: Step[];

    @ApiProperty({ required: false, description: "known issues details" })
    knownIssues: { step: Step; note: string };
}
