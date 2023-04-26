import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "../models/actions_base";
import {Actions2 } from "src/models/actions";

export class ActionsResponse {
    @ApiProperty({ description: "List of Actions" })
    Actions: ActionBase[];
}

export class ActionResponse {
    @ApiProperty({ description: "Accept schema" })
    Action: Actions2;
}
