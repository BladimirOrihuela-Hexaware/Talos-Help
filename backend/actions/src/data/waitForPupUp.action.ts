import { Action } from "../models/action.entity";

export const WaitForPupUpData: Action = {
    actionName:"Wait",
    description: 
        "This action waits for a popup window to be displayed. Needed to specify the time to wait for pupup in the value parameter.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"The timing needed for this action should be specified in seconds."
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
            "In the following image shows the example of how to use the wait for pup-up action in the step #3 of the test case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"WaitForPopUp.stmtc"
        }
};