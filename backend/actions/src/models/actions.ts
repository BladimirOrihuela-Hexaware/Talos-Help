import { Action } from "./action.entity";

export type ActionsType = Action;

export class Actions {
    [id: string]: ActionsType;
}
