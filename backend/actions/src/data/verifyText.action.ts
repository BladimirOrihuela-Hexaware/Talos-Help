import { Action } from "../models/action.entity";

export const VerifyTextData: Action = {
    actionName:"Verify Text",
    description: 
        "This action verifies a containing text displayed in the DOM of an element.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"If there is not any element with the text given, the test case will stop its execution and it will mark it as fail."
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
            "In the following image shows the example of how to use the verify text action in the step #3 and #5 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"VerifyText.stmtc"
        }
};