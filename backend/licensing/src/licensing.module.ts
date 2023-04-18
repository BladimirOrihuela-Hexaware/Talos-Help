import { Module } from "@nestjs/common";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";
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
    controllers: [LicensingController],
    providers: [LicensingService],
})
export class LicensingModule {}
