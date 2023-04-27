import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "../models/actions_base.entity";
import {Action} from "src/models/action.entity";

export class ActionsResponse {
    @ApiProperty({ description: "List of Actions" })
    Actions: ActionBase[];
}

export class ActionResponse {
    @ApiProperty({ description: "Action schema" })
    Action: Action;
}
