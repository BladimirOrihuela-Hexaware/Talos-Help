import { Action } from "../models/action.entity";

export const DoubleClickOnObjectData: Action = {
    actionName:"Double Click On Object",
    description: 
        "This action is used to emulate a double click operation on elements like buttons, links, etc.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"Double click is a method provided by the Action class of Selenium WebDriver, that It is a built-in capability of Selenium that handles keyboard and mouse actions."
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
            "In the following image shows the example of how to use the Double click on object Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DoubleClickOnObject.stmtc"
        }
};


