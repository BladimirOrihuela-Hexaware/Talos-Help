import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Logger,
    NotImplementedException,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AcquireLockDto } from "../dto/acquire-lock.dto";
import { ReleaseLockDto } from "../dto/release-lock.dto";
import { LicensingService } from "../licensing.service";
import { SignatureGuard } from "../signature-guard/signature.guard";

@Controller('desktop')
export class DesktopController {
    private readonly logger = new Logger(DesktopController.name);

    constructor(private readonly licensingService: LicensingService, private readonly jwtService: JwtService) {}
    
    @Put("lock")
    @ApiTags("lock")
    @UseGuards(SignatureGuard)
    @ApiOperation({ description: "Acquires a lock on the license" })
    @ApiResponse({ status: 200, description: "Lock on license was successfully acquired" })
    @ApiResponse({ status: 403, description: "Forbidden. License is either invalid or expired" })
    @ApiResponse({ status: 409, description: "You already acquired a lock" })
    @ApiResponse({ status: 500, description: "Error" })
    @HttpCode(200)
    public async acquireLock(@Body() body: AcquireLockDto): Promise<boolean> {
        try {
            this.licensingService.acquireLock(body.licenseId, body.machineId);
        } catch(e) {
            // TODO catch errors and throw exceptions accordingly
        }
        return true;
    }

    @Delete("lock")
    @ApiTags("lock")
    @UseGuards(SignatureGuard)
    @ApiOperation({ description: "Releases an already acquired lock on the license" })
    @ApiResponse({ status: 200, description: "Lock on license was released" })
    @ApiResponse({ status: 409, description: "Lock has not been acquired" })
    @ApiResponse({ status: 500, description: "Error" })
    public async releaseLock(@Body() body: ReleaseLockDto): Promise<boolean> {
        try {
            this.licensingService.releaseLock(body.licenseId, body.machineId);
        } catch(e) {
            // TODO catch errors and throw exceptions accordingly
        }
        return true;
    }
}
