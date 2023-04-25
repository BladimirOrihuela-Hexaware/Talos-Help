import { Module } from "@nestjs/common";
import { IntegrationsController, IntegrationController } from "./features.controller";
import { FeaturesService } from "./features.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
            }),
        }),
    ],
    controllers: [IntegrationsController, IntegrationController],
    providers: [FeaturesService],
})
export class AppModule {}
