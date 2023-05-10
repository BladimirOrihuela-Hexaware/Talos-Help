import { Action } from "../models/action.entity";

export const SwitchToWindowData: Action = {
    actionName:"Switch To Window",
    description: 
        "This action allows you to switch to a new window in the current web page.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"There are 2 ways to specify the window you want to move there are specifying the title or index of the target window in the value parameter."
    },
    parameters:[
		{
			title:"Value",
			description:"Required"
		},{
			title:"Locator Type",
			description:"Not Required",
		},{	
			title:"Locator Value",
			description:"Not Required",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the switch to window action in the steps #3",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SwitchToWindow.stmtc"
        }
};