import { BasicIntegration } from "./basic_integration";

type Step = {
  desc: string;
  image: string;
};

export interface IGenrocket extends BasicIntegration {
  prerequisites: { desc: string; list: string[] };
  connect: Step[];
  linkDomain: { desc: string; steps: Step[] };
  uploadAtts: { desc: string; alert: string; steps: Step[] };
  getAtts: { desc: string; steps: Step[]; note: string };
  unlink: { steps: Step[]; note: string };
  unlinkProject: Step[];
  knownIssues: { step: Step; note: string };
}
