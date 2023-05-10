import { Action } from "../models/action.entity";

export const VerifyIfExistData: Action = {
    actionName:"Verify If Exist",
    description: 
        "This action verifies if an object exists in the current webpage and it has also the functionality if the object specified does not exist you can use 'executenextSteps:numberOfSteps' to exclude the number of following steps to execute.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"You can use this action only in order to validate if the object exists."
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
            "In the following image shows the example of how to use the verify if exist action in the step #3 and #5 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"VerifyIfExist.stmtc"
        }
};