import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
