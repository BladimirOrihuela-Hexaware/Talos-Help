import { Action } from "../models/action.entity";

export const MouseOverData: Action = {
    actionName:"Mouse Over",
    description: 
        "This action simulates a user hovering the mouse over the specified element.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"This actions is more common used to hovering a dropdown menu, and then use a click action to select any subitem in the displayed menu."
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
            "In the following image shows the example of how to use the mouse over Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"MouseOver.stmtc"
        }
};


