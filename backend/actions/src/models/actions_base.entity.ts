import { ApiProperty } from "@nestjs/swagger";

export class ActionBase {
    @ApiProperty({required:true, description:"The Action Name"})
    actionName: string;
    
    @ApiProperty({required:true, description:"The description for the action"})
    description: string;
    
    @ApiProperty({required:true, description:"Flag if the action is supported for web testing"})
    isWeb: boolean;
    
    @ApiProperty({required:true, description:"Flag if the action is supported for mobile testing"})
    isMobile: boolean;
    
    @ApiProperty({required:true, description:"Flag if the action is supported for desktop testing"})
    isDesktop: boolean;
}