import {
    Body,
    Controller,
    Delete,
    HttpCode,
    Logger,
    Put,
    Patch,
    UseGuards,
    Req
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DesktopJWTPayload } from "src/models/desktop-jwt-payload";
import { AcquireLockDto } from "../dto/acquire-lock.dto";
import { ReleaseLockDto } from "../dto/release-lock.dto";
import { JwtGuard } from "../jwt-guard/jwt.guard";
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
    @ApiResponse({ status: 200, description: "Lock on license was successfully acquired. Returns a JWT" })
    @ApiResponse({ status: 403, description: "Forbidden. License is either invalid or expired" })
    @ApiResponse({ status: 409, description: "You already acquired a lock" })
    @ApiResponse({ status: 500, description: "Error" })
    @HttpCode(200)
    public async acquireLock(@Body() body: AcquireLockDto): Promise<string> {
        try {
            this.licensingService.acquireLock(body.licenseId, body.clientId);
            const payload: DesktopJWTPayload = {
                clientId: body.clientId,
                licenseId: body.licenseId
            };
            return await this.jwtService.signAsync(payload, { expiresIn: "90d" }); 
            // I don't think there is a single person that will keep TALOS opened for more than 90 days.
            // If so, there will be a problem but simply creating the session again will solve it
        } catch(e) {
            // TODO catch errors and throw exceptions accordingly
        }
    }

    @Delete("lock")
    @ApiTags("lock")
    @UseGuards(SignatureGuard)
    @UseGuards(JwtGuard)
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

    @Patch("lock")
    @ApiTags("lock")
    @UseGuards(SignatureGuard)
    @UseGuards(JwtGuard)
    @ApiOperation({ description: "Send keep-active message" })
    @ApiResponse({ status: 200 })
    @ApiResponse({ status: 409, description: "Lock has not been acquired" })
    @ApiResponse({ status: 500, description: "Error" })
    @HttpCode(200)
    public async clientKA(@Req() req: Request): Promise<boolean> {
        try {
            const clientId = req["jwtPayload"].clientId;
            const licenseId = req["jwtPayload"].licenseId;
            this.licensingService.handleKeepAlive(licenseId, clientId);
        } catch(e) {
            // TODO catch errors and throw exceptions accordingly
        }
        return true;
    }
}
