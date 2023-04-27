import { ApiProperty } from "@nestjs/swagger";

export class ActionBase {
    @ApiProperty({required:true})
    actionName: string;
    @ApiProperty({required:true})
    description: string;
    @ApiProperty({required:true})
    isWeb: boolean;
    @ApiProperty({required:true})
    isMobile: boolean;
    @ApiProperty({required:true})
    isDesktop: boolean;
}