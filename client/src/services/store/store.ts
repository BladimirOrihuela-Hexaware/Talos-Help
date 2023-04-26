import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlicer } from "@services/authentication/slicer";
export const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
