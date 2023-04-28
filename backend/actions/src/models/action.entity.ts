import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "./actions_base.entity";
import { Parameter } from "./parameters";

export class Action extends ActionBase {
    @ApiProperty({required:false, description:"Simple message to display"})
    message:{ messageType: string; description: string};
    
    @ApiProperty({required:true,description:"Aray of paratemer values needed for Talos actions"})
    parameters: Parameter[];
    
    @ApiProperty({required:true, description:"Example of the action to use"})
    example: {description: string; img:string};
   
    @ApiProperty({required:false,description:"Simple message to display with a Talos Test case file attached"})
    messageWithTCFile: {messageType: string; description: string; TCfile: string};
}