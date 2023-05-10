import { Action } from "../models/action.entity";

export const SubmitData: Action = {
    actionName:"Submit",
    description: 
        "This action submit the specified form, it is applicable only for <form> and makes handling of form easier. It can be used with any element inside a form.",
    isWeb: true,
    isMobile: false,
    isDesktop: false,
	message:{
        messageType:"information",
        description:
			"You can use it on any element inside of form tags to submit that form, what it is the difference of clicking the submit button in the form."
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
            "In the following image shows the example of how to use the submit action in the steps #3 of the Test Case",
            img:""
        },
        messageWithTCFile:{
            messageType:"successful",
            description:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Submit.stmtc"
        }
};