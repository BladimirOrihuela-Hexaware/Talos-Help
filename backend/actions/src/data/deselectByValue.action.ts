import { Action } from "../models/action.entity";

export const DeselectByValueData: Action = {
    actionName:"Deselect By Value",
    description: 
        "This action is to deselect all options that have a value matching the argument.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"When given 'txtValue' as the text this would deselect an option like: <option value='txtValue'>Text Displayed</option>"
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
            "In the following image shows the example of how to use the Deselect By value Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DeselectByValue.stmtc"
        }
};


