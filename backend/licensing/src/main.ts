import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { LicensingModule } from "./licensing.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const VERSION = "latest";

async function bootstrap() {
    const app = await NestFactory.create(LicensingModule);
    const configService = app.get(ConfigService);

    // set API version
    const globalPrefix = `/licensing/${VERSION}`;
    app.setGlobalPrefix(globalPrefix);

    // OpenAPI config (only for dev environment)
    if (configService.get("NODE_ENV", "development") === "development") {
        const config = new DocumentBuilder()
            .setTitle("Licensing microservice")
            .setDescription("Generates and validates licenses")
            .setVersion(VERSION)
            .build();
        const doc = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(`${globalPrefix}/docs`, app, doc);
    }

    await app.listen(3000);
}
bootstrap();
