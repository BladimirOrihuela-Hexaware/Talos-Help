import { Module } from "@nestjs/common";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [LicensingController],
    providers: [LicensingService],
})
export class LicensingModule {}
