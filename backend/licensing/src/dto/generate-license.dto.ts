import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsISO8601, IsInt, IsString, IsUUID, Length, Max, Min, MinDate } from "class-validator";
import { LicensingService } from "../licensing.service";
import { Type } from "class-transformer";

export class GenerateLicenseDto {
    @ApiProperty({
        description: "Project name",
        example: "Super mock",
    })
    @IsString()
    @Length(2, 255)
    projName: string;

    @ApiProperty({
        description: "Id of the organization",
        example: "578b06e4-bed8-43e9-8b0f-10b819fe8890"
    })
    @IsUUID("4")
    orgId: string;

    @ApiProperty({
        description: "Maximum number of clients that can use TALOS simultaneously. -1 indicates \"unlimited\"",
        example: 5
    })
    @IsInt()
    @Min(-1)
    maxClients: number;

    @ApiProperty({
        description: "Expiration date. Should be in the future. Time data may not be considered"
    })
    @Type(() => Date)
    @IsDate()
    @MinDate(() => new Date())
    expiration: Date;

    @ApiProperty({
        description: "If client doesn't notify it is still alive after this number of minutes, it'll be considered dead and lock will be released. "
            + "0 means \"no timeout\"",
        default: LicensingService.DEFAULT_CLIENT_TIMEOUT
    })
    @IsInt()
    @Min(0)
    @Max(60)
    clientTimeout: number;
}
