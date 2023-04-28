import { Test, TestingModule } from "@nestjs/testing";
import { ActionsController } from "./actions.controller";
import { ActionController } from "./action.controller";
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
        expect(Actions[0]).toMatchObject({
            actionName: "Alert Accept",
            description: "Clicks on the 'OK' button as soon as any pop up window / alert appears.",
            isWeb: true,
            isMobile: true,
            isDesktop: false,
        });
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
        const { Action } = icontroller.getAction("alertaccept");
        expect(Action).toMatchObject({
            actionName: "Alert Accept",
            description: "Clicks on the 'OK' button as soon as any pop up window / alert appears.",
            isWeb: true,
            isMobile: true,
            isDesktop: false,
            message: {
                messageType: "information",
                description:
                    "An alert/pop up is a small message box which appears on screen to give the user some information or notification.",
            },
            parameters: [
                {
                    title: "Value",
                    description: "Not Required",
                },
                {
                    title: "Locator Type",
                    description: "Not Applicable",
                },
                {
                    title: "Locator Value",
                    description: "Not Applicable",
                },
                {
                    title: "Known Issue",
                    description: "Not Applicable",
                },
            ],
            example: {
                description:
                    "In the following image shows the example of how to use the Alert Accept Action in the step #5 of the Test Case example.",
                img: "",
            },
            messageWithTCFile: {
                messageType: "successful",
                description:
                    "For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
                TCfile: "Path for the Test Case.stmtc",
            },
        });
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
