import { Test, TestingModule } from "@nestjs/testing";
import { ActionsController } from "./actions.controller";
import { ActionController } from "./action.controller"
import { ActionService } from "./actions.service";
import { NotFoundError } from "@atptalos/common";


describe("Actions Controller", () => {
    let icontroller: ActionsController;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ActionsController],
            providers: [ActionService],
        }).compile();

        icontroller = app.get<ActionsController>(ActionsController);
    });

    it("should return a formated list of Actions", () => {
        const { Actions } = icontroller.getActions();
        expect(Actions).toHaveLength(1);
        expect(Actions[0]).toMatchObject({ actionName: "Alert Accept", description: "Clicks on the 'OK' button as soon as any pop up window / alert appears.",
        isWeb:true, isMobile: true, isDesktop: false});
    });
});


describe("Action Controller", () => {
    let icontroller: ActionController;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ActionController],
            providers: [ActionService],
        }).compile();

        icontroller = app.get<ActionController>(ActionController);
    });

    it("should return a found action", () => {
        const { Action } = icontroller.getAction("accept");
        expect(Action).toMatchObject({ actionName: "Accept", description: "Clicks on the 'OK' button as soon as any pop up window / alert appears." });
    });

    it("should return not found error", () => {
        try {
            icontroller.getAction("invalid id");
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });

    it("should return error when no id is provided", () => {
        try {
            icontroller.getAction(undefined);
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});
