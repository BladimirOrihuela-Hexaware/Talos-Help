import { Services } from "@common/constants/services";
import type { Integration } from "@atptalos/common";

export type Config = {
    id: string; //ID of the integration/cloud/action
    method: "GET" | "POST";
    service: Services;
    route?: "integration" | "action";
    data?: any;
    responseType?: Integration;
};
