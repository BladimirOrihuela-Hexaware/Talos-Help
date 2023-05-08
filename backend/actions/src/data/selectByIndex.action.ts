import { Action } from "../models/action.entity";

export const selectByIndexData: Action = {
    actionName:"Select By Index",
    description: 
        "This action select an option from a drop-down list starting from number 0. Matches options based on its index.",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"It takes the integer parameter which is the index value of Select element."
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
            "In the following image shows the example of how to use the select by index action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SelectByIndex.stmtc"
        }
};