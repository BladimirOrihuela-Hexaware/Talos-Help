import { Action } from "../models/action.entity";

export const ObjectEnabledData: Action = {
    actionName:"Object Enabled",
    description: 
        "This action verifies if an element is currently enabled or not in the web page.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"Null"
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
            "In the following image shows the example of how to use the Object displayed action in the step #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"objectDisplayed.stmtc"
        }
};


