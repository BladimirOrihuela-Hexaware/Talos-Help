import { Action } from "../models/action.entity";

export const CheckData: Action = {
    actionName:"Check",
    description: 
        "This action click a checkbox, toggle or radio button specified on the screen",
    isWeb: true,
    isMobile: true,
    isDesktop: true,
    
	message:{
        messageType:"information",
        description:
			"The checkbox is a GUI element that allows the user to make certain choices for the given options. We can define a checkbox in HTML using <input type='checkbox'> tag. Any locator strategy  that uses DOM for locating web elements"
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
            "In the following image shows the example of how to use the Check Action in the step #4 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Check.stmtc"
        }
};


