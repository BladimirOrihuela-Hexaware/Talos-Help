import { Action } from "../models/action.entity";

export const WindowsFocusData: Action = {
    actionName:"Windows Focus",
    description: 
        "Focus on specified window. When the browser opens the new window the user is able to switch the focus in order to work in the new window with words as: Main or Child.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"This action requires a value parameter - Main: Focus on the main window / Child: Focus on the new window."
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
            "In the following image shows the example of how to use the windows focus action in the step #4 and #7 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"WindowFocus.stmtc"
        }
};