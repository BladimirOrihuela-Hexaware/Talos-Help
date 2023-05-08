import { RootState } from "@services/store";
import type { ITypes } from "./types";
import type { BasicIntegration } from "@atptalos/common";

export const integrationIsCached = ({ integration }: RootState, id: ITypes): boolean => {
    const { integrations } = integration;
    return id in integrations;
};

export const getIntegrationList = ({ integration }: RootState): BasicIntegration[] => {
    const { integrations } = integration;
    return Object.keys(integrations).map((id) => integrations[id]);
};
