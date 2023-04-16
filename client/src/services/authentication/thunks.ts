import { AppThunk } from "@services/store/store";
import { actions } from "@services/authentication/slicer";

export const signin = (): AppThunk => (dispatch, getState) => {
  dispatch(actions.signin());
  //TODO call axios service to send request
};
