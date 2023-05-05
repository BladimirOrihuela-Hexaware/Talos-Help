import { getSelectedRoute, isToggleOpen } from "../selectors";
import type { RootState } from "@services/store";
import type { State } from "../slicer";

describe("Selectors", () => {
    describe("getSelectedRoute", () => {
        test("it should get the initial route '/' by default", () => {
            const navigation: State = {
                selected: "/",
                openActionsList: false,
            };
            const resp = getSelectedRoute({ navigation } as RootState);
            expect(resp).not.toBe("anything");
            expect(resp).toBe("/");
        });
        test("it should get '/license' route", () => {
            const navigation: State = {
                selected: "/license",
                openActionsList: false,
            };
            const resp = getSelectedRoute({ navigation } as RootState);
            expect(resp).toBe("/license");
        });
    });
    it("should return if actions list is open", () => {
        const navigation: State = {
            selected: "/",
            openActionsList: false,
        };
        const resp = isToggleOpen({ navigation } as RootState);
        expect(resp).toBeFalsy();
        const navigation2: State = {
            selected: "/",
            openActionsList: true,
        };
        const resp2 = isToggleOpen({ navigation: navigation2 } as RootState);
        expect(resp2).toBeTruthy();
    });
});
