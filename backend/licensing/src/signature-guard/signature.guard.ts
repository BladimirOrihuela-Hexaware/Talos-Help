import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import * as fs from "fs";
import * as openpgp from "openpgp";
import { config } from "process";

@Injectable()
export class SignatureGuard implements CanActivate {
    private TALOS_PGP_PUBKEY: openpgp.Key;

    /**
     * Maximum timedelta (in seconds) allowed between request timestamp and current time
     */
    private readonly MAX_TIMEDELTA = 30;

    private readonly IS_PROD: boolean = true;

    constructor(private configService: ConfigService) {
        // since this operation is going to be executed during bootstap, is ok to use a sync method
        const pubkey = fs.readFileSync(configService.getOrThrow("TALOS_PGP_PUBKEY"), { encoding: "utf-8", flag: "r" });
        openpgp.readKey({ armoredKey: pubkey })
            .then(key => this.TALOS_PGP_PUBKEY = key)
            .catch(e => {
                console.error("🔥😱🔥 Fatal error. Unable to read TALOS_GPG_PUBKEY!", e);
                throw e;
            });
        
        this.IS_PROD = configService.get("NODE_ENV") === "production";
    }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const request = ctx.switchToHttp().getRequest();
        const contentType: string = request.headers["content-type"];
        if (contentType.trim().toLowerCase() !== "text/plain")
            throw new BadRequestException(this.IS_PROD ? undefined : "Content-Type should be text/plain");
        
        // read body as pgp signed message
         let pgpSignedMessage: openpgp.Message<any>;
        try {
            pgpSignedMessage = await openpgp.readCleartextMessage({
                cleartextMessage: request.body
            }) as openpgp.Message<any>;
        } catch(e) {
            console.error(`Failed to create PGP message from request body: ${JSON.stringify(request.body)}`, e);
            
            // it is very likely that the exception was produced because body is not a valid pgp message
            throw new BadRequestException(this.IS_PROD ? undefined : "Request body may not be a valid pgp armored message");
        }

        // verify signature
        try {
            const verificationRes = await openpgp.verify({
                message: pgpSignedMessage,
                verificationKeys: this.TALOS_PGP_PUBKEY
            });
            const { verified, keyID } = verificationRes.signatures[0];
            await verified;
        } catch(e) {
            console.error("🔥🔥🔥 Client sent invalid PGP signature. Is someone trying to fuck with us?"); // TODO log event + more info
            throw new UnauthorizedException(this.IS_PROD ? undefined : "Invalid signature");
        }

        // Now that we know signature is valid, we can be somewhat sure that the body is valid and thus it doesn't require much validation
        let body: {ts: number};
        try {
            body = JSON.parse(pgpSignedMessage.getText() as string);
        } catch(e) {
            console.error("🔥🔥🔥 Client sent invalid body but valid PGP signature. Has client's private PGP key been compromised?"); // TODO log event + more info
            throw new UnauthorizedException(this.IS_PROD ? undefined : "Invalid body");
        }
        if (typeof body.ts !== "number")
            throw new UnauthorizedException(this.IS_PROD ? undefined : "Timestamp (ts) is not a number");

        const timedelta: number = Date.now() - body.ts;
        if (timedelta < 0)
            throw new UnauthorizedException(this.IS_PROD ? undefined : "Impossible! You're a time traveller");
        if (timedelta > this.MAX_TIMEDELTA)
            throw new UnauthorizedException(this.IS_PROD ? undefined : "Your internet connection may be unstable");

        request.body = body; // change body for next handler
        return true;
    }
}
