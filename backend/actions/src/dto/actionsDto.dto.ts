import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "../models/actions_base.entity";

export class ActionsDto {
    @ApiProperty({
        description: "Actions list",
        example: [{ actionName: "Action Name", description: "Action description", isWeb: true, isMobile: true, isDesktop:true }], 
    })
    Actions: ActionBase;
}
