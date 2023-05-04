import { Action } from "../models/action.entity";

export const AlertSetTextData: Action = {
    actionName:"Alert Set Text",
    description: 
        "This action allows you to send a text data in a pop up / alert dialog box that is displayed on the screen.",
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
			description:"Required: Text to send"
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
            "In the following image shows the example of how to use the Alert set text Action in the step #5 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"AlertSetText.stmtc"
        }
};