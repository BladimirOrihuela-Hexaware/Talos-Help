import { Action } from "../models/action.entity";

export const DeselectAllData: Action = {
    actionName:"Deselect All",
    description: 
        "This actions is to remove selection from all selected options of select box. It will works with multiple select box when you need to remove all selections.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"This action is only valid when the SELECT element supports multiple selections"
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
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
            "In the following image shows the example of how to use the Deselect All Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DeselectAll.stmtc"
        }
};


