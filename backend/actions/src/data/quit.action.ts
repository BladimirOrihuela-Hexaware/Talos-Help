import { Action } from "../models/action.entity";

export const QuitData: Action = {
    actionName:"Quit",
    description: 
        "This action quits the entire browser session with all its tabs and windows. The command is used when the user wants to end the program.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"If you do not use this action at the end of the program, the WebDriver session will not close properly and may lead to memory leaks as files will not be wiped off memory."
    },
    parameters:[
		{
			title:"Value",
			description:"Not Required"
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
            "In the following image shows the example of how to use the Quit action in the steps #5 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Quit.stmtc"
        }
};