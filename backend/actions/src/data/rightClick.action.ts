import { Action } from "../models/action.entity";

export const RightClickData: Action = {
    actionName:"Right Click",
    description: 
        "Simulate when a user tries to click the Right mouse button on a website or a web element to look at its context menu",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"To use this action first needs to use MouseOver action before to point to a specific coordinates of the element."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
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
            "In the following image shows the example of how to use the right click action in the steps #4 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"RightClick.stmtc"
        }
};