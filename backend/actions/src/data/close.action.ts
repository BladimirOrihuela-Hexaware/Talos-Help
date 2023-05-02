import { Action } from "../models/action.entity";

export const CloseData: Action = {
    actionName:"Close",
    description: 
        "This action is used to close the browser window currently in focus.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"During the automation process, if there is more than one browser window opened, then the close() command will close only the current browser window, which is having focus at that time."
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
            "In the following image shows the example of how to use the close Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Close.stmtc"
        }
};


