import { Action } from "../models/action.entity";

export const DeselectByIndexData: Action = {
    actionName:"Deselect By Index",
    description: 
        "Deselect the option by the index, as determined by the 'index' attribute of the element.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"Used to deselect the list option using the specified Index of the List Option from the multi-selection Box field. Index value starts from 0"
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
            "In the following image shows the example of how to use the Deselect By Index Action in the step #4 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DeselectByIndex.stmtc"
        }
};


