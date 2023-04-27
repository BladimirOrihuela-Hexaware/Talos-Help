import { Action } from "../models/actions.entity";

export type ActionsType = Action;

export class Actions {
    [id: string]: ActionsType;
}
