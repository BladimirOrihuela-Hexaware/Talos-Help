import { Actions,Actions_type } from "./models/actions";
import { Injectable } from "@nestjs/common";
import { ActionBase } from "./models/actions_base";
import * as data from "./data";

const actions: Actions = {
    accept: data.AcceptData
};

@Injectable()
export class AppService {
    getAction(id: string): Actions_type {
        return actions[id];
    }
    getActions(): ActionBase[] {
        return Object.values(actions).map((i) => {
            return { actionName: i.actionName, description: i.description, isWeb: i.isWeb, isMobile: i.isMobile, isDesktop: i.isDesktop};
        });
    }
}
