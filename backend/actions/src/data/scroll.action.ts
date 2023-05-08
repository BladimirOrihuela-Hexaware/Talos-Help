import { Action } from "../models/action.entity";

export const ScrollData: Action = {
    actionName:"Scroll",
    description: 
        "This action performs a Scroll (up, down, right or left). If the scroll is up the value needs to be negative number and if is down positive number.",
    isWeb: true,
    isMobile: false,
    isDesktop: true,
	message:{
        messageType:"information",
        description:
			"This action needs a value parameter to specify the x,y position to scroll. For web browser testing the only position needed is 'y' to scroll only donw or up of the screen."
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
            "In the following image shows the example of how to use the right scroll action in the steps #3 and #5 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Scroll.stmtc"
        }
};