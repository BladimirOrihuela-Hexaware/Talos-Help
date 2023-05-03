import { Action } from "../models/action.entity";

export const DoubleClickData: Action = {
    actionName:"Double Click",
    description: 
        "This action is used to emulate a double click operation on elements like buttons, links, etc.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"When no locator type and locator value are set, the action is performed in the current mouse position in DOM."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
		},{		
			title:"Locator Type",
			description:"Required for specific element",
		},{	
			title:"Locator Value",
			description:"Required for specific element",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Double Click Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DoubleClick.stmtc"
        }
};


