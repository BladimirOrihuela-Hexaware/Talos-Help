import { Pipeline } from "@services/pipeline/axios";
import { AppThunk } from "@services/store";
import type { ITypes } from "./types";
import type { Config } from "@services/pipeline/types";
import { actions } from "./slicer";
import { integrationIsCached } from "./selectors";
import * as integrations from "./list";
import { NotFoundError } from "@atptalos/common";

export const getIntegration =
    (integrationId: ITypes): AppThunk =>
    async (dispatch, getState) => {
        //First validate if integration is cached. If so, stop fetching
        if (integrationIsCached(getState(), integrationId)) {
            dispatch(actions.loadCached());
            return true;
        }

        //request data
        if (integrationId in integrations) {
            // @ts-ignore: integrationId does exist in integrations list
            const config: Config = integrations[integrationId];
            await new Pipeline().request(config);
        } else {
            dispatch(actions.onError(new NotFoundError()));
            return false;
        }

        //save data
    };
