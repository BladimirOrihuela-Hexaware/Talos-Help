import { RootState } from "@services/store";
import type { ITypes } from "./types";

export const integrationIsCached = ({ integration }: RootState, id: ITypes): boolean => {
    const { integrations } = integration;
    return id in integrations;
};
