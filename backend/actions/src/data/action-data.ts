import { Action } from "../models/actions.entity";

export const AlertAcceptData: Action = {
    actionName:"Alert Accept",
    description: 
        "Clicks on the 'OK' button as soon as any pop up window / alert appears.",
    isWeb: true,
    isMobile: true,
    isDesktop: false,
    panelTop:{
        panelType:"information",
        desc:
			"An alert/pop up is a small message box which appears on screen to give the user some information or notification."
    },
    parameters:[
		{
			title:"Value",
			desc:"Not Required"
		},{		
			title:"Locator Type",
			desc:"Not Applicable",
		},{	
			title:"Locator Value",
			desc:"Not Applicable",
		},{	
			title:"Known Issue",
			desc:"Not Applicable"		
		}],
        example:{
            desc:
            "In the following image shows the example of how to use the Alert Accept Action in the step #5 of the Test Case example.",
            img:""
        },
        panelBottom:{
            panelType:"successful",
            desc:"For more information regarding this action, please download the following Talos TC file and import it to your TALOS Client.",
            TCfile:"Path for the Test Case.stmtc"
        }
};