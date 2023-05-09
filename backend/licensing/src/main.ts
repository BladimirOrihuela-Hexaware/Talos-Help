import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LicensingModule } from "./licensing.module";
import { NestExpressApplication } from "@nestjs/platform-express";

const VERSION = "latest";
const GLOBAL_PREFIX = `/licensing/${VERSION}`;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(LicensingModule);
    const configService = app.get(ConfigService);

    // global configuration for application
    app.useGlobalPipes(new ValidationPipe()).setGlobalPrefix(GLOBAL_PREFIX).useBodyParser("text"); // text parser is required for text/plain messages (the ones using PGP)

    // OpenAPI config (only for dev environment)
    if (configService.get("NODE_ENV", "development") === "development") {
        const config = new DocumentBuilder()
            .setTitle("Licensing microservice")
            .setDescription("Generates and validates licenses")
            .setVersion(VERSION)
            .build();
        const doc = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, doc);
    }

    await app.listen(+configService.get("PORT"));
}
bootstrap();

export { GLOBAL_PREFIX };
