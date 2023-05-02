import { Controller, Get, Param } from "@nestjs/common";
import { ActionService } from "./actions.service";
import { ApiResponse, ApiTags, ApiParam, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { NotFoundError } from "@atptalos/common";
import {ActionResponse } from "./responses/actions.res";


@Controller("action")
export class ActionController {
    constructor(private readonly actionService: ActionService) {}

    @Get(":id")
    @ApiTags("action")
    @ApiParam({
        name: "id",
        description: "Action Id",
        required: true,
        allowEmptyValue: false,
        example: "alertaccept",
    })
    @ApiResponse({
        status: 200,
        description: "Action page details",
        type: ActionResponse,
    })
    @ApiResponse({ status: 404, description: "Action ID not found" })
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    getAction(@Param("id") id: string): ActionResponse {
        const data = this.actionService.getAction(id.toLocaleLowerCase());
        if (!data) throw new NotFoundError();
        return { Action: data };
    }
}