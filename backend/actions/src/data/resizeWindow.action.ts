import { Action } from "../models/action.entity";

export const ResizeWindowData: Action = {
    actionName:"Resize Window",
    description: 
        "This actions performs set window size. TALOS has 2 differents ways to rezise the window. The first one is giving a heigh and weigh (x,y) and the other is to specify a device name for windows size emulation.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"If you want to emulate a device screen you have to specify the name of the device in the value parameter, this are the supported devices: (Galaxy S5, Pixel 2, Pixel 2 XL, iPhone 5/SE, iPhone 6/7/8, iPhone 6/7/8 Plus, iPhone X, iPad, iPad Pro)"
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
            "In the following image shows the example of how to use the resize window action in the steps #3 and #5 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"ResizeWindow.stmtc"
        }
};