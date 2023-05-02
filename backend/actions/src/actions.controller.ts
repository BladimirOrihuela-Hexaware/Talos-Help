import { Controller, Get, Param } from "@nestjs/common";
import { ActionService } from "./actions.service";
import { ApiResponse, ApiTags, ApiParam, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { ActionsDto } from "./dto/actionsDto.dto";
import { ActionsResponse} from "./responses/actions.res";


@Controller("actions")
export class ActionsController {
    constructor(private readonly actionService: ActionService) {}
    
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
        const data = this.actionService.getActions();
        return { Actions: data };
    }
}