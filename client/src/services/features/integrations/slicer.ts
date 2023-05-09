import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Integration, BasicIntegration } from "@atptalos/common";

export type IntegrationState = {
    integrations: {
        [name: string]: Integration;
    };
    loading: boolean;
    error?: Error;
    fetched: boolean;
};

export const initialState: IntegrationState = {
    integrations: {},
    loading: false,
    fetched: false,
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
        loadIntegrations: (state, action: PayloadAction<BasicIntegration[]>) => {
            const integrations = action.payload;
            integrations.map((integration) => {
                const name = integration.title.toLowerCase();
                state.integrations[name] = integration;
            });
            state.loading = false;
            state.error = undefined;
            state.fetched = true;
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
