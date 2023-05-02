import { Actions,ActionsType } from "./models/actions";
import { Injectable } from "@nestjs/common";
import { ActionBase } from "./models/actions_base.entity";
import * as data from "./data/index";

const actions: Actions = {
    alertaccept : data.AlertAcceptData,
    alertacceptifexist: data.AlertAcceptIfExistData,
    alertdismiss: data.AlertDismissData,
    alertsettext: data.AlertSetTextData,
    check:data.CheckData,
    clear:data.ClearData,
};

@Injectable()
export class ActionService {
    getAction(id: string): ActionsType {
        return actions[id];
    }
    getActions(): ActionBase[] {
        return Object.values(actions).map((i) => {
            return { actionName: i.actionName, description: i.description, isWeb: i.isWeb, isMobile: i.isMobile, isDesktop: i.isDesktop};
        });
    }
}
