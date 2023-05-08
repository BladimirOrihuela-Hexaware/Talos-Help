import { Action } from "../models/action.entity";

export const selectFrameData: Action = {
    actionName:"Select Frame",
    description: 
        "Switch to frame within the current window.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"The locator details are the ones to specify the frame you want to move."
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
            "In the following image shows the example of how to use the select frame action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SelectFrame.stmtc"
        }
};