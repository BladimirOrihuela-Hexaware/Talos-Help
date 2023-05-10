import {
    Body,
    Controller,
    Delete,
    HttpCode,
    Logger,
    Put,
    Patch,
    UseGuards,
    Req,
    ValidationPipe,
    InternalServerErrorException,
    HttpException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DesktopJWTPayload } from "src/models/desktop-jwt-payload";
import { AcquireLockDto } from "../dto/acquire-lock.dto";
import { JwtGuard } from "../jwt-guard/jwt.guard";
import { LicensingService, SPOut } from "../licensing.service";
import { SignatureGuard } from "../signature-guard/signature.guard";
import { AuthenticationResponse } from "../models/authentication.response";

@Controller('desktop')
export class DesktopController {
    private readonly logger = new Logger(DesktopController.name);

    constructor(private readonly licensingService: LicensingService, private readonly jwtService: JwtService) {}
    
    @Put("lock")
    @ApiTags("lock")
    @UseGuards(SignatureGuard)
    @ApiOperation({ description: "Acquires a lock on the license" })
    @ApiResponse({ status: 200, description: "Lock on license was successfully acquired. Returns a JWT", type: AuthenticationResponse })
    @ApiResponse({ status: 403, description: "Forbidden. License is either invalid or expired" })
    @ApiResponse({ status: 409, description: "You already acquired a lock or limit has been reached" })
    @ApiResponse({ status: 500, description: "Error" })
    @HttpCode(200)
    public async acquireLock(
        // validation pipe is required here because body was parsed by signature guard, after global validation pipe could validate it
        @Body(new ValidationPipe()) body: AcquireLockDto
    ): Promise<AuthenticationResponse> {
        let status: SPOut;
        try {
            status = await this.licensingService.acquireLock(body.licenseId, body.clientId);
            // I don't think there is a single person that will keep TALOS opened for more than 90 days.
            // If so, there will be a problem but simply creating the session again will solve it
        } catch(e) {
            console.error("Error while acquiring a lock", e);
            throw new InternalServerErrorException();
        }

        switch (status) {
            case "E_LIMIT_REACHED":
            case "E_ALREADY_ACQUIRED":
                throw new HttpException(status, 409);
            case "E_EXPIRED":
                throw new HttpException(status, 403);
            case "SUCCESS":
                const payload: DesktopJWTPayload = {
                    clientId: body.clientId,
                    licenseId: body.licenseId
                };
                try {
                    return {
                        jwt: await this.jwtService.signAsync(payload, { expiresIn: "90d" }),
                        success: true
                    } 
                } catch (e) {
                    console.error("Error while generating JWT", e);
                    throw new InternalServerErrorException();
                }
            default:
                throw new InternalServerErrorException();
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
    public async releaseLock(@Req() req: Request): Promise<boolean> {
        let status: SPOut;
        try {
            const jwtPayload = req["jwtPayload"] as DesktopJWTPayload;
            status = await this.licensingService.releaseLock(jwtPayload.licenseId, jwtPayload.clientId);
        } catch(e) {
            console.error("Error while releasing lock", e);
            throw new InternalServerErrorException();
        }
        
        switch(status) {
            case "E_ALREADY_ACQUIRED":
                return false;
            default:
                return true;
        }
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
            throw new InternalServerErrorException();
        }
        return true;
    }
}
