import { ActionBase } from "./actions_base";
import { Parameter } from "./parameters";

export interface Action extends ActionBase {
    panelTop:{ panelType: string; desc: string};
    parameters: Parameter[];
    example: {desc: string; img:string};
    panelBottom: {panelType: string; desc: string; TCfile: string};
}