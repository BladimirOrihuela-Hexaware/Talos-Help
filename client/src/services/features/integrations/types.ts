import * as integrations from "./list";
import type { Integration, BasicIntegration } from "@atptalos/common";

export type ITypes = keyof typeof integrations;
export type IntegrationTypes = BasicIntegration | Integration;
