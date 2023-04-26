import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./features.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const VERSION = "latest";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // set API version
    const globalPrefix = `/features/${VERSION}`;
    app.setGlobalPrefix(globalPrefix);

    // OpenAPI config (only for dev environment)
    if (configService.get("NODE_ENV", "development") === "development") {
        const config = new DocumentBuilder()
            .setTitle("Actions microservice")
            .setDescription("Provides documentation for all TALOS actions")
            .setVersion(VERSION)
            .build();
        const doc = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(`${globalPrefix}/docs`, app, doc);
    }

    await app.listen(3000);
}
bootstrap();
