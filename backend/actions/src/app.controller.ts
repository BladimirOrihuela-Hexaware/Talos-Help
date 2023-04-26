import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiResponse, ApiTags, ApiParam, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { NotFoundError } from "@atptalos/common";
import { ActionsDto } from "./dto/actionsDto.dto";
import { ActionsResponse, ActionResponse } from "./responses/actions.res";


@Controller("actions")
export class ActionsController {
    constructor(private readonly appService: AppService) {}
    
    @Get()
    @ApiTags("actions")
    @ApiExtraModels(ActionsDto)
    @ApiResponse({
        status: 200,
        description: "actions details",
        schema: { $ref: getSchemaPath(ActionsDto) },
    })
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    @ApiResponse({ status: 200, description: "List of all actions" })
    getActions(): ActionsResponse {
        const data = this.appService.getActions();
        return { Actions: data };
    }
}

@Controller("action")
export class ActionController {
    constructor(private readonly appService: AppService) {}

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
    })
    @ApiResponse({ status: 404, description: "Action ID not found" })
    @ApiResponse({ status: 403, description: "Forbidden. License doesn't exist or is expired" })
    getAction(@Param("id") id: string): ActionResponse {
        const data = this.appService.getAction(id.toLocaleLowerCase());
        if (!data) throw new NotFoundError();
        return { Action: data };
    }
}