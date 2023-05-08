import { Action } from "../models/action.entity";

export const RightClickOnObjectData: Action = {
    actionName:"Right Click On Object",
    description: 
        "Simulate when a user tries to click the Right mouse button on a website or a web element to look at its context menu in a specific web element.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"This action only takes an element as parameter to perform this action"
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
            "In the following image shows the example of how to use the right click on object action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"RightClickOnObject.stmtc"
        }
};