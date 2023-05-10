import { Action } from "../models/action.entity";

export const UnCheckData: Action = {
    actionName:"Un-check",
    description: 
        "This action uncheck a toggle-button (checkbox/radio).",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"Otherwise if the toggle-button is uncheck the action is going to check it."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
		},{
			title:"Locator Type",
			description:"Required",
		},{	
			title:"Locator Value",
			description:"Required",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Uncheck action in the step #3 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"UnCheck.stmtc"
        }
};