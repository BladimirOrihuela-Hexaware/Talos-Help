import { Action } from "../models/action.entity";

export const TypeJSData: Action = {
    actionName:"Type JS",
    description: 
        "This action take into consideration only the JavaScript from OnBlur and OnFocus event",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"Warning",
        description:
			"This action Doesn't support this object locator: Xpath"
    },
    parameters:[
		{
			title:"Value",
			description:"Required"
		},{
			title:"Locator Type",
			description:"Required",
		},{	
			title:"Locator Value",
			description:"Required",
		},{	
			title:"Known Issue",
			description:"This option may not work with pages using javascript."		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Type JS action in the steps #3 and #4 of the test case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"TypeJS.stmtc"
        }
};