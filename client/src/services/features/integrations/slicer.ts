import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Integration } from "@atptalos/common";

export type IntegrationState = {
    integrations: {
        [name: string]: any;
    };
    loading: boolean;
    error?: Error;
};

export const initialState: IntegrationState = {
    integrations: {},
    loading: false,
};

export const integrationSlicer = createSlice({
    name: "integrations",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.error = undefined;
        },
        fetchSuccess: (state, action: PayloadAction<Integration>) => {
            state.loading = false;
            state.error = undefined;
            //Update integrations list
            const name = action.payload.title.toLowerCase();
            state.integrations[name] = action.payload;
        },
        loadCached: (state) => {
            state.loading = false;
        },
        onError: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload;
        },
        clean: (state) => {
            state.integrations = {};
        },
    },
});

export const { actions, reducer } = integrationSlicer;
