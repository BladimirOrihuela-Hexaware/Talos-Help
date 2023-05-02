import { Module } from "@nestjs/common";
import { ActionsController } from "./actions.controller";
import { ActionController } from "./action.controller"
import { ActionService } from "./actions.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid("development", "production", "test")
                    .default("development")
            })
        })
    ],
    controllers: [ ActionController,ActionsController],
    providers: [ActionService],
})
export class ActionModule {}
