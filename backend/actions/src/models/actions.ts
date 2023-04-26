import { Action } from "../models/actions.entity";

export type Actions2 = Action;

export interface Actions {
    [id: string]: Actions2;
}
