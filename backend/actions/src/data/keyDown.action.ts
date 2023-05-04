import { Action } from "../models/action.entity";

export const KeyDownData: Action = {
    actionName:"Key Down",
    description: 
        "This method simulates a keyboard action when a specific keyboard key needs to press. So, whenever you need to press a key and then perform specific other actions. This method presses the specified key on the currently focussed Web Element. This method generally presses the 'Modifier keys' such as SHIFT, CTRL, ALT, etc. ",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"If you want to press the keyboard key on a specified web element, then that web element first needs to be focussed explicitly, and then this method needs to be invoked. you have to give in the value parameter the Modifier keys to perform that action."
    },
    parameters:[
		{
			title:"Value",
			description:"Required"
		},{
			title:"Locator Type",
			description:"Not Required",
		},{	
			title:"Locator Value",
			description:"Not Required",
		},{	
			title:"Known Issue",
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Key down Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"KeyDown.stmtc"
        }
};


