import { Action } from "../models/action.entity";

export const DragAndDropOnObjectData: Action = {
    actionName:"Drag And Drop On Object",
    description: 
        "This action is to perform a mouse event when a user moves (drags) a web element from one location and then places (drops) it at another point using a web element like a reference to drop.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
    
	message:{
        messageType:"information",
        description:
			"Locator details are to specify wich element needs to be dragged and the value parameter is to specify another web element where is gonna be moved, using a coma to separate the Locator Type and Locator value just like 'id , elementid'"
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
            "In the following image shows the example of how to use the Drag and Drop on Object Action in the step #3 of the Test Case.",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"DragAndDropOnObject.stmtc"
        }
};


