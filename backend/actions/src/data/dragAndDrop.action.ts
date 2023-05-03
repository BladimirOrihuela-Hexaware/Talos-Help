import { Action } from "../models/action.entity";

export const DragAndDropData: Action = {
    actionName:"Drag And Drop",
    description: 
        "This action is to perform a mouse event when a user moves (drags) a web element from one location and then places (drops) it at another point.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"Locator details are to specify wich element needs to be dragged and the value parameter is to specify the x,y pixel location to be droped"
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
			description:"Not Applicable"		
		}],
        example:{
            description:
            "In the following image shows the example of how to use the Drag and Drop Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DragAndDrop.stmtc"
        }
};


