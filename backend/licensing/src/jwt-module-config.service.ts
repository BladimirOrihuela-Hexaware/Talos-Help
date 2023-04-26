import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JWTModuleConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            global: true,
            secretOrPrivateKey: this.configService.get("JWT_PRIVATE_KEY"),
            signOptions: {
                expiresIn: this.configService.get("JWT_EXP"),
            },
        };
    }
}
