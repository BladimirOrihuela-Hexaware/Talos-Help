import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from "@reduxjs/toolkit";
import { authSlicer } from "@services/authentication/slicer";
import { navigationSlicer } from "@services/navigation/slicer";
import { reducer as integrationSlicer } from "@services/features/integrations/slicer";
export const store = configureStore({
    reducer: {
        auth: authSlicer.reducer,
        navigation: navigationSlicer.reducer,
        integration: integrationSlicer,
    },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
