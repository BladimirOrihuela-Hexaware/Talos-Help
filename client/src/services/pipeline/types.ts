import { Services } from "@common/constants/services";
import type { Integration } from "@atptalos/common";

export type Config = {
    method: "GET" | "POST";
    service: Services;
    id?: string; //ID of the integration/cloud/action
    route?: "integration" | "action" | "integrations";
    data?: any;
    responseType?: Integration;
};
