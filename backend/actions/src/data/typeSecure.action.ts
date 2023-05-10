import { Action } from "../models/action.entity";

export const TypeSecureData: Action = {
    actionName:"Type Secure",
    description: 
        "This action sets the value of an input field, as though you typed it in. The string is going to be encoded in order to be secure.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"This actions is used to protect data information in the report and test case visibility."
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
            "In the following image shows the example of how to use the Type Secure action.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"TypeSecure.stmtc"
        }
};