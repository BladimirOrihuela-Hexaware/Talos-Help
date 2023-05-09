import { navigationSlicer, actions } from "../slicer";
import type { State } from "../slicer";

describe("Navigation reducers", () => {
    const reducer = navigationSlicer.reducer;
    it("should return initial state", () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ selected: "/", openActionsList: false });
    });
    it("should update selected when navigating to clouds", () => {
        const initialState: State = { selected: "/", openActionsList: false };
        const newState = reducer(initialState, actions.navigateTo("/clouds"));
        expect(newState.selected).toBe("/clouds");
    });
    it("should toggle actions list flag", () => {
        const initialState: State = { selected: "/", openActionsList: false };
        let updatedState = reducer(initialState, actions.toggleActions);
        expect(updatedState.openActionsList).toBeTruthy();
        updatedState = reducer(updatedState, actions.toggleActions);
        expect(updatedState.openActionsList).toBeFalsy();
        updatedState = reducer(updatedState, actions.toggleActions);
        expect(updatedState.openActionsList).toBeTruthy();
        updatedState = reducer(updatedState, actions.toggleActions);
        expect(updatedState.openActionsList).toBeFalsy();
    });
});
