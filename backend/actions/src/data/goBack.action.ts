import { Action } from "../models/action.entity";

export const GoBackData: Action = {
    actionName:"Go Back",
    description: 
        "This action simulates the user clicking the 'back' button on their browser.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"Takes youback by one page on the browser's history."
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
            "In the following image shows the example of how to use the go Back Action in the step #5 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"GoBack.stmtc"
        }
};


