import { RootState } from "@services/store/store";
import { User } from "./slicer";

export const getLoading = (state: RootState): boolean => {
  return state.auth.loading;
};
export const getUser = (state: RootState): undefined | User => {
  return state.auth.user;
};
