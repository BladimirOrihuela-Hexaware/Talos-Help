import { Action } from "../models/action.entity";

export const TypeData: Action = {
    actionName:"Type",
    description: 
        "This action sets the value of an input field, as though you typed it in.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"You can use parameters from the Datasheet to execute iterations with different value, consult datasheets to know more about it."
    },
    parameters:[
		{
			title:"Value",
			description:"Required"
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
            "In the following image shows the example of how to use the Type action in the steps #3 and #4 of the test case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Type.stmtc"
        }
};