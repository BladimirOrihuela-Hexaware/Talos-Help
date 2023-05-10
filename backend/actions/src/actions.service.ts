import { Actions,ActionsType } from "./models/actions";
import { Injectable } from "@nestjs/common";
import { ActionBase } from "./models/actions_base.entity";
import * as data from "./data/index";

const actions: Actions = {
    alertaccept : data.AlertAcceptData,
    alertacceptifexist: data.AlertAcceptIfExistData,
    alertdismiss: data.AlertDismissData,
    alertsettext: data.AlertSetTextData,
    check: data.CheckData,
    clear: data.ClearData,
    click: data.ClickData,
    close: data.CloseData,
    deselectall: data.DeselectAllData,
    deselectbyindex: data.DeselectByIndexData,
    deselectbytext: data.DeselectByTextData,
    deselectbyvalue: data.DeselectByValueData,
    doubleclick: data.DoubleClickData,
    doubleclickonobject: data.DoubleClickOnObjectData,
    draganddrop: data.DragAndDropData,
    draganddroponobject: data.DragAndDropOnObjectData,
    goback: data.GoBackData,
    goforward: data.GoForwardData,
    highlight: data.HighlightData,
    keydown: data.KeyDownData,
    keyup: data.KeyUpData,
    mouseover: data.MouseOverData,
    mouseoverandclick: data.MouseOverAndClickData,
    navigate: data.NavigateData,
    objectdisplayed: data.ObjectDisplayedData,
    objectenabled: data.ObjectEnabledData,
    objectselected: data.ObjectSelectedData,
    quit: data.QuitData,
    refresh: data.RefreshData,
    resizewindow: data.ResizeWindowData,
    rightclick: data.RightClickData,
    rightclickonobject: data.RightClickOnObjectData,
    scroll: data.ScrollData,
    selectbyindex: data.SelectByIndexData,
    selectbytext: data.SelectByTextData,
    selectbyvalue: data.SelectByValueData,
    selectframe: data.SelectFrameData,
    selectlistbytext: data.SelectListByTextData,
    submit: data.SubmitData,
    switchtodefaultcontent: data.SwitchToDefaultContentData,
    switchtoframe: data.SwitchToFrameData,
    switchtowindow: data.SwitchToWindowData,
    type: data.TypeData,
    typejs: data.TypeJSData,
    typerandomvalue: data.TypeRandomValueData,
    typesecure: data.TypeSecureData,
    uncheck: data.UnCheckData,
    verifyifexist: data.VerifyIfExistData,
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
