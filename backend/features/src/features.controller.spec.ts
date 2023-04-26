import { Test, TestingModule } from "@nestjs/testing";
import { IntegrationsController, IntegrationController } from "./features.controller";
import { FeaturesService } from "./features.service";
import { NotFoundError } from "@atptalos/common";

describe("Integrations Controller", () => {
    let icontroller: IntegrationsController;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [IntegrationsController],
            providers: [FeaturesService],
        }).compile();

        icontroller = app.get<IntegrationsController>(IntegrationsController);
    });

    it("should return a formated list of integrations", () => {
        const { integrations } = icontroller.getIntegrations();
        expect(integrations).toHaveLength(1);
        expect(integrations[0]).toMatchObject({ title: "GenRocket", logo: "genrocket logo.png" });
    });
});

describe("Integration Controller", () => {
    let icontroller: IntegrationController;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [IntegrationController],
            providers: [FeaturesService],
        }).compile();

        icontroller = app.get<IntegrationController>(IntegrationController);
    });

    it("should return a found integration", () => {
        const { integration } = icontroller.getIntegration("genrocket");
        expect(integration).toMatchObject({ title: "GenRocket", logo: "genrocket logo.png" });
    });

    it("should return not found error", () => {
        try {
            icontroller.getIntegration("invalid id");
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    it("should return error when no id is provided", () => {
        try {
            icontroller.getIntegration(undefined);
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});
