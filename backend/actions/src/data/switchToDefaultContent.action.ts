import { Action } from "../models/action.entity";

export const SwitchToDefaultContentData: Action = {
    actionName:"Switch To Default Content",
    description: 
        "This action hands over the control to the first frame in the frame set.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"This action does not require an elememnt locator details, but you can specify the default content you want to switch and it works the same."
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
            "In the following image shows the example of how to use the Switch To Default Content action in the steps #5 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"SwitchToDefaultContent.stmtc"
        }
};