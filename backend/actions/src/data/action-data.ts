import { Action } from "../models/action.entity";

export const AlertAcceptData: Action = {
    actionName:"Alert Accept",
    description: 
        "Clicks on the 'OK' button as soon as any pop up window / alert appears.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    message:{
        messageType:"information",
        description:
			"An alert/pop up is a small message box which appears on screen to give the user some information or notification."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
		},{		
			title:"Locator Type",
			description:"Not Applicable",
		},{	
			title:"Locator Value",
			description:"Not Applicable",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Alert Accept Action in the step #5 of the Test Case example.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Path for the Test Case.stmtc"
        }
};

export const AlertAcceptIfExistData: Action = {
    actionName:"Alert Accept If Exist",
    description: 
        "Clicks on the 'OK' button of the pop up/alert if there is one in the screen, if not it will be ignored.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    message:{
        messageType:"information",
        description:
			"An alert/pop up is a small message box which appears on screen to give the user some information or notification.",
	},
    parameters:[
		{
			title:"Value",
			description:"Not Required"
		},{		
			title:"Locator Type",
			description:"Not Applicable",
		},{	
			title:"Locator Value",
			description:"Not Applicable",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Alert Accept  If Exist Action in the step #5 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"AlertAcceptIfExist.stmtc"
        }
};