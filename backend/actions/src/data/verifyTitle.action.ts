import { Action } from "../models/action.entity";

export const VerifyTitleData: Action = {
    actionName:"Verify Title",
    description: 
        "Verifies the text title in a web page. This action provides you different ways to verify the title: Equals- validates the title is equivalent to the specific value, NotEquals- validates the title is not equivalent to the specific value and Contains- validates the title contains something similar to the specific value.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"This action requires as mandatory value the option you want to use to veify the title."
    },
    parameters:[
		{
			title:"Value",
			description:"Required"
		},{
			title:"Locator Type",
			description:"Not Required",
		},{	
			title:"Locator Value",
			description:"Not Required",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the verify title action in the step #3 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"VerifyTitle.stmtc"
        }
};