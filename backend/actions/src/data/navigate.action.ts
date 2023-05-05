import { Action } from "../models/action.entity";

export const NavigateData: Action = {
    actionName:"Navigate",
    description: 
        "This action does a navigate to a webpage.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"This action use to be the first action of all the script."
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
            "In the following image shows the example of how to use the navigate action in the step #1 of the Test Case. when you have two navigate actions in the same TC, it navigates both urls in one windows page.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Navigate.stmtc"
        }
};


