import { Module } from "@nestjs/common";
import { ActionController,ActionsController } from "./app.controller";
import { AppService } from "./app.service";
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
    providers: [AppService],
})
export class AppModule {}
