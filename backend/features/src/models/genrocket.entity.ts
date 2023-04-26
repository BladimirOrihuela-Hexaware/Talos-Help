import { IntegrationBase } from "../entities/integration_base";
import { Step } from "./step";

export interface GenRocket extends IntegrationBase {
    prerequisites: { desc: string; list: string[] };
    connect: Step[];
    linkDomain: { desc: string; steps: Step[] };
    uploadAtts: { desc: string; alert: string; steps: Step[] };
    getAtts: { desc: string; steps: Step[]; note: string };
    unlink: { steps: Step[]; note: string };
    unlinkProject: Step[];
    knownIssues: { step: Step; note: string };
}
