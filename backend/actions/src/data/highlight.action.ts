import { Action } from "../models/action.entity";

export const HighlightData: Action = {
    actionName:"Highlight",
    description: 
        "This action highlights an specific object.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"To highlight a desktop object, you must use an image locator."
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
            "In the following image shows the example of how to use the highlight Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Highlight.stmtc"
        }
};


