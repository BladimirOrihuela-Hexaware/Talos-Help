import { Action } from "../models/action.entity";

export const TypeRandomValueData: Action = {
    actionName:"Type Random Value",
    description: 
        "Type a random value using a specific option to specify the type of random value you need to use and the lenght of it separated by ':' EJ. RandomValueType:Lenght.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Information",
        description:
			"The types of ramdom values are alphabetic, alphanumeric, numeric, alphabet."
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
            "In the following image shows the example of how to use the Type Random Value action.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"TypeRandomValue.stmtc"
        }
};