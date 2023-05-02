import { Action } from "../models/action.entity";

export const ClearData: Action = {
    actionName:"Clear",
    description: 
        "This action is used to clear text of any field, such as input field of a form or even to anchor tag paragraph, etc.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"If this element is a text entry element, the Clear() method will clear the value. It has no effect on other elements. Text entry elements are defined as elements with INPUT or TEXTAREA tags."
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
            "In the following image shows the example of how to use the clear Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Clear.stmtc"
        }
};


