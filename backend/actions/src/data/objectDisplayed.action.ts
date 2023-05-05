import { Action } from "../models/action.entity";

export const ObjectDisplayedData: Action = {
    actionName:"Object Displayed",
    description: 
        "This action verifies if an element is currently displayed or not in the web page.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"There are three different actions to ensure the presence of web elements on a web page: isDisplayed, isSelected and IsEnabled"
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


