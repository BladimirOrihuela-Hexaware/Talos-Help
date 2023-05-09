import { RootState } from "@services/store";
import type { ITypes } from "./types";
import type { BasicIntegration, Integration } from "@atptalos/common";

export const integrationIsCached = ({ integration }: RootState, id: ITypes): boolean => {
    const { integrations } = integration;
    return id in integrations;
};

export const getIntegrationList = ({ integration }: RootState): BasicIntegration[] => {
    const { integrations } = integration;
    return Object.keys(integrations).map((id) => integrations[id]);
};

export const getIntegrationByName = ({ integration }: RootState, id: ITypes): Integration | undefined => {
    const { integrations } = integration;
    return integrations[id];
};

export const getLoading = ({ integration }: RootState): boolean => {
    return integration.loading;
};

export const shouldFetchIntegration = ({ integration }: RootState, id: ITypes): boolean => {
    const { integrations } = integration;
    if (id in integrations) {
        return integrations[id].knownIssues === undefined;
    }
    return true;
};
