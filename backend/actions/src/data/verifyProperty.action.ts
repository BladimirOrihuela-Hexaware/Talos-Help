import { Action } from "../models/action.entity";

export const VerifyPropertyData: Action = {
    actionName:"Verify Property",
    description: 
        "This action verifies if an object has a specific atribute for a specific element. This actions requires the atribute name separated by ':' and then the expected value in the atribute. EX. Atribute:ExpectedAtributeValue",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"This action also supports to validate the property value with a regex expression. EX. atribute:(regex):regularExpression"
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
            "In the following image shows the example of how to use the verify property action in the step #3 and #5 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"VerifyProperty.stmtc"
        }
};