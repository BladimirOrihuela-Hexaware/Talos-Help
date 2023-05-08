import { Action } from "../models/action.entity";

export const selectListByTextData: Action = {
    actionName:"Select List By Text",
    description: 
        "This action select an option from a drop-down list by text required.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"null"
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
            "In the following image shows the example of how to use the select list by text action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SelectListByText.stmtc"
        }
};