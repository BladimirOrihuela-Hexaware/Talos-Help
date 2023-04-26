import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "../models/actions_base";

export class ActionsDto {
    @ApiProperty({
        description: "Actions list",
        example: [{ title: "Action Name", description: "Action description", isWeb: true, isMobile: true, isDesktop:true }],
    })
    actions: ActionBase[];
}
