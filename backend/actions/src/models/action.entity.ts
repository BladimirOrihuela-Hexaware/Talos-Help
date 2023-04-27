import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "./actions_base.entity";
import { Parameter } from "./parameters";

export class Action extends ActionBase {
    @ApiProperty({required:false})
    message:{ messageType: string; description: string};
    @ApiProperty({required:true})
    parameters: Parameter[];
    @ApiProperty({required:true})
    example: {description: string; img:string};
    @ApiProperty({required:false})
    messageWithTCFile: {messageType: string; description: string; TCfile: string};
}