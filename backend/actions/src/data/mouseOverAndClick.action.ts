import { Action } from "../models/action.entity";

export const MouseOverAndClickData: Action = {
    actionName:"Mouse Over And Click",
    description: 
        "This action does a mouse over in a object and then clicks in another one in ine step. This action needs 2 web elements to simulate a user hovering the mouse on the first element and then clicks on the second one, so to specified the two web elements in one step its needed to specify them in the locator value parameter separated by the char ~ using the same locator type for both elements.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"This actions is used to hovering a dropdown menu and then click an element in the same step, the value parameter is needed to specify the waiting time (seconds) that the element will be in hovered state."
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
            "In the following image shows the example of how to use the mouse over and click Action in the step #3 of the Test Case. This action needs to specify the 2 locator values in the same input separated by a '~'. Ej. Locator_Value1~LocatorValue2.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"MouseOverAndClick.stmtc"
        }
};


