import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlicer } from "@services/authentication/slicer";
import { navigationSlicer } from "@services/navigation/slicer";
export const store = configureStore({
    reducer: {
        auth: authSlicer.reducer,
        navigation: navigationSlicer.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
