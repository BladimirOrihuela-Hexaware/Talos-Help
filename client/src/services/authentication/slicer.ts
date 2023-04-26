import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  client: string;
}

interface authState {
  user?: User;
  loading: boolean;
}

const initialState = {
  user: undefined,
  loading: false,
};

export const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      state.loading = true;
    },
    stopLoading: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
  },
});

export default { reducer: authSlicer.reducer };
export const actions = authSlicer.actions;
