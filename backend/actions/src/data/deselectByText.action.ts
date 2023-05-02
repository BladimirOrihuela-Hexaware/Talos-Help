import { Action } from "../models/action.entity";

export const DeselectByTextData: Action = {
    actionName:"Deselect By Text",
    description: 
        "This actions is to deselect the option by text, the option with the text displayed in the DOM.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"When given 'TextDisplayed' as the text this would deselect an option like: <option value='foo'>TextDisplayed</option>"
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
            "In the following image shows the example of how to use the Deselect By text Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DeselectByText.stmtc"
        }
};


