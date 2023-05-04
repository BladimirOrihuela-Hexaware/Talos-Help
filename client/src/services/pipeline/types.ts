import { Services } from "@common/constants/services";
import type { Integration } from "@atptalos/common";

export type Config = {
    id?: string;
    method: "GET" | "POST";
    service: Services;
    route?: "integration" | "action";
    data?: any;
    responseType?: Integration;
};
