import { ApiProperty } from "@nestjs/swagger";
import { ActionBase } from "./actions_base.entity";
import { Parameter } from "./parameters";

export class Action extends ActionBase {
    @ApiProperty({required:false})
    panelTop:{ panelType: string; desc: string};
    @ApiProperty({required:true})
    parameters: Parameter[];
    @ApiProperty({required:true})
    example: {desc: string; img:string};
    @ApiProperty({required:false})
    panelBottom: {panelType: string; desc: string; TCfile: string};
}