import { Test, TestingModule } from "@nestjs/testing";
import { LicensingController } from "./licensing.controller";
import { LicensingService } from "./licensing.service";

describe("LicensingController", () => {
    let licensingController: LicensingController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [LicensingController],
            providers: [LicensingService],
        }).compile();

        licensingController = app.get<LicensingController>(LicensingController);
    });

    describe("root", () => {
        /*it('should return "Hello World!"', () => {
      expect(licensingController.getHello()).toBe("Hello World!");
    });*/
    });
});
