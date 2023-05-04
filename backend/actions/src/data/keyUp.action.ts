import { Action } from "../models/action.entity";

export const KeyUpData: Action = {
    actionName:"Key Up",
    description: 
        "This method simulates a keyboard action when a specific keyboard key was pressed and needs to be released.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"If you want to use key up action, first needs to use the key down action and specify the Modifier key that was used with Key down and needs to release"
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
            "In the following image shows the example of how to use the Key up Action in the step #5 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"KeyUp.stmtc"
        }
};


