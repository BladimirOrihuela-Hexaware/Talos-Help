import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as Joi from "joi";
import { JWTModuleConfigService } from "./jwt-module-config.service";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";
import { DesktopController } from './desktop/desktop.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
                DATABASE_URL: Joi.string(),
                JWT_PRIVATE_KEY: Joi.string(),
                JWT_EXP: Joi.string().default("30d"),
            }),
        }),
        JwtModule.registerAsync({
            useClass: JWTModuleConfigService,
            imports: [ConfigModule],
        }),
    ],
    controllers: [LicensingController, DesktopController],
    providers: [LicensingService],
})
export class LicensingModule {}
