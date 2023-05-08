import { Pipeline } from "@services/pipeline/axios";
import { AppThunk } from "@services/store";
import type { ITypes } from "./types";
import type { Config } from "@services/pipeline/types";
import { actions } from "./slicer";
import { integrationIsCached } from "./selectors";
import * as integrations from "./list";
import { NotFoundError } from "@atptalos/common";
import type { BasicIntegration } from "@atptalos/common";
import { BadRequestError } from "@atptalos/common";

export const clean = (): AppThunk => (dispatch, getState) => {
    dispatch(actions.clean());
};

export const getAllIntegrations = (): AppThunk => async (dispatch, getState) => {
    // validate if already we have fetched successfully.
    const { fetched } = getState().integration;
    if (fetched) return;

    // fetch all integrations
    dispatch(actions.startLoading());
    const config: Config = { method: "GET", service: "features", route: "integrations" };
    const response = await new Pipeline(config).request();
    if (!response) {
        dispatch(actions.onError(new BadRequestError("Something bad happened")));
        return;
    }

    // save data
    const integrations: BasicIntegration[] = response.integrations;
    dispatch(actions.loadIntegrations(integrations));
};

export const getIntegration =
    (integrationId: ITypes): AppThunk =>
    async (dispatch, getState) => {
        //First validate if integration is cached. If so, stop fetching
        if (integrationIsCached(getState(), integrationId)) {
            dispatch(actions.loadCached());
            return true;
        }

        dispatch(actions.startLoading());

        //request data
        if (integrationId in integrations) {
            // @ts-ignore: integrationId does exist in integrations list
            const config: Config = integrations[integrationId];

            const response = await new Pipeline(config).request();
            const data = response.integration;

            if (!data) {
                dispatch(actions.onError(new NotFoundError()));
                return false;
            }
            //save data
            dispatch(actions.fetchSuccess(data));
        } else {
            dispatch(actions.onError(new NotFoundError()));
            return false;
        }
    };
