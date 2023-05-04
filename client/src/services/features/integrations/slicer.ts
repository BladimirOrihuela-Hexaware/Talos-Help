import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ITypes } from "./types";

type IntegrationState = {
    integrations: {
        [name: string]: any;
    };
    loading: boolean;
    error?: Error;
};

const initialState: IntegrationState = {
    integrations: {},
    loading: false,
};

export const integrationSlicer = createSlice({
    name: "integrations",
    initialState,
    reducers: {
        fetchData: (state, _action) => {
            state.loading = true;
        },
        fetchSuccess: (state, _action) => {
            state.loading = false;
            state.error = undefined;
            //Update integrations list
        },
        loadCached: (state) => {
            state.loading = false;
        },
        onError: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { actions, reducer } = integrationSlicer;
