import type { RootState } from "@services/store";
import type { IntegrationState } from "../slicer";
import { integrationIsCached } from "../selectors";

describe("integrations selectors", () => {
    describe("integrationIsCached", () => {
        test("should return true when integration already exist in store", () => {
            const integration: IntegrationState = {
                integrations: { genrocket: { value: "test" } },
                loading: false,
            };
            expect(integrationIsCached({ integration } as RootState, "genrocket")).toBeTruthy();
        });
        test("should return true when integration already exist in store", () => {
            const integration: IntegrationState = {
                integrations: {},
                loading: false,
            };
            expect(integrationIsCached({ integration } as RootState, "genrocket")).toBeFalsy();
        });
    });
});
