import { Action } from "../models/actions.entity";

export type Actions_type = Action;

export interface Actions {
    [id: string]: Actions_type;
}
