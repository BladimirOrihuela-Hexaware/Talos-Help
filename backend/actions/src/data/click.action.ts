import { Action } from "../models/action.entity";

export const ClickData: Action = {
    actionName:"Click",
    description: 
        "This action is used to emulate the click operation on elements like buttons, links, etc.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"If the element is not clickable, then this operation is ignored. This allows you to simulate a users to accidentally missing the target when clicking."
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
            "In the following image shows the example of how to use the click Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Click.stmtc"
        }
};


