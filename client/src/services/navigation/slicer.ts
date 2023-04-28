import { Routes } from "@common/constants";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
    selected: Routes;
    openActionsList: boolean;
};

const initialState: State = {
    selected: "/",
    openActionsList: false,
};

export const navigationSlicer = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<Routes>) => {
            state.selected = action.payload;
        },
        toggleActions: (state) => {
            state.openActionsList = !state.openActionsList;
        },
    },
});
export const actions = navigationSlicer.actions;
