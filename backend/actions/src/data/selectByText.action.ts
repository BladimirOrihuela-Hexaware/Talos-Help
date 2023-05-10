import { Action } from "../models/action.entity";

export const SelectByTextData: Action = {
    actionName:"Select By Text",
    description: 
        "Select an option from a drop-down. Matches options based on their visible text.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"The required text is the one that appears in the DOM."
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
            "In the following image shows the example of how to use the select by text action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SelectByIndex.stmtc"
        }
};