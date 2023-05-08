import { AppThunk } from "@services/store/store";
import { actions } from "@services/authentication/slicer";
import { Pipeline } from "@services/pipeline/axios";

export const signin = (): AppThunk => (dispatch, getState) => {
    dispatch(actions.signin());
    //TODO validate response
};
