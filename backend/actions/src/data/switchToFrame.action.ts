import { Action } from "../models/action.entity";

export const SwitchToFrameData: Action = {
    actionName:"Switch To Frame",
    description: 
        "Switch to a frame or iframe within the current window by locator or by index. There are different ways to specify with frame you want to change, for indexes you need to specify the index frame you want to change starting with 0, or giving an element locator details to specify the frame you want to change.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"When you want to specify the iframe element by index, you do not need to give any locator details, and viseversa when you specify the locators details, it is not needed an index value."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required if using element locator"
		},{
			title:"Locator Type",
			description:"Not Required if using an index value",
		},{	
			title:"Locator Value",
			description:"Not Required if using an index value",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the different ways to switch a frame in the steps #2 and #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SwitchToFrame.stmtc"
        }
};