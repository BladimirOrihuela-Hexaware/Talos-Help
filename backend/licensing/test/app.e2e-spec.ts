import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { XMLBuilder } from "fast-xml-parser";
import * as request from "supertest";
import { LicensingModule } from "./../src/licensing.module";
import { AuthenticationErrorCode } from "./../src/models/error-codes";
import * as openpgp from "openpgp";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Prisma, PrismaClient } from "@prisma/client";
import { GenerateLicenseDto } from "src/dto/generate-license.dto";
import { LicenseGenerationResponse } from "src/models/license-generation.response";
import { AcquireLockDto } from "src/dto/acquire-lock.dto";

describe("Licensing microservice (e2e)", () => {
    let app: INestApplication;
    let httpServer;
    let talosPrivateKey: openpgp.PrivateKey;
    let prisma: PrismaClient;

    let license: {id: string; maxClients: number; clientTimeout: number};
    let generator: {id: string; email: string};
    let org: {id: string; name: string};

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [LicensingModule],
        }).compile();

        app = moduleFixture.createNestApplication<NestExpressApplication>()
            .useBodyParser("text")
            .useGlobalPipes(new ValidationPipe({transform: true}));
        await app.init();
        httpServer = app.getHttpServer();

        talosPrivateKey = await openpgp.readPrivateKey({armoredKey: PRIVATE_KEY});

        // insert org and generator into database
        prisma = new PrismaClient();
        generator = await prisma.generator.create({
            select: {
                id: true,
                email: true
            },
            data: {
                active: true,
                email: "test-generator@testing.test"
            }
        });
        org = await prisma.org.create({
            data: {
                name: "Org 4 testing"
            }
        });
    });

    afterAll(async () => await app.close());

    describe("/auth-old authentication", () => {
        it(`should successfully authenticate`, async () => {
            const xmlBuilder = new XMLBuilder();
            const obj = {
                license: xmlBuilder.build({
                    LicenseEntity: {
                        UID: "5YHYXO-18D0YWH-1YNFW9B-1TELAPD",
                        Type: "Single",
                        CreateDateTime: new Date(2001, 7, 15).toISOString(),
                        Signature: Buffer.from("7/15/3024").toString("base64"),
                        LicensedTo: "SuperCompany:superfakeemail",
                    },
                }),
            };
            const res = await request(httpServer).post("/auth-old").send(obj).expect(200);
    
            expect(res.body.success).toBe(true);
            expect(res.body.jwt).toBeTruthy();
            expect(res.body.errCode).toBeFalsy();
    
            // validate JWT payload
            const jwtPayload = JSON.parse(Buffer.from(res.body.jwt.split(".")[1], "base64").toString());
            expect(jwtPayload).toHaveProperty(["exp"]);
            expect(jwtPayload).toHaveProperty(["iat"]);
            expect(jwtPayload).toHaveProperty("licenseId", "OLD");
        });
    
        it.each`
            name                         | expectedErrCode                      | license
            ${"Missing fields"}          | ${AuthenticationErrorCode.E_INVALID} | ${{}}
            ${"Invalid creation date"}   | ${AuthenticationErrorCode.E_INVALID} | ${{ UID: "jaja", Type: "dsf", CreateDateTime: "muahahaha", Signature: Buffer.from("7/15/3024").toString("base64"), LicensedTo: "sdh" }}
            ${"Expired license"}         | ${AuthenticationErrorCode.E_EXPIRED} | ${{ UID: "jaja", Type: "dsf", CreateDateTime: new Date(2001, 7, 15).toISOString(), Signature: Buffer.from("7/15/2022").toString("base64"), LicensedTo: "sdh" }}
            ${"Invalid expiracy date"}   | ${AuthenticationErrorCode.E_INVALID} | ${{ UID: "jaja", Type: "dsf", CreateDateTime: new Date(2001, 7, 15).toISOString(), Signature: new Date("7/7/2040").toISOString(), LicensedTo: "sdh" }}
            ${"Creation date in future"} | ${AuthenticationErrorCode.E_INVALID} | ${{ UID: "jaja", Type: "dsf", CreateDateTime: new Date(2040, 7, 15).toISOString(), Signature: Buffer.from("7/15/2040").toString("base64"), LicensedTo: "sdh" }}
        `("should validate $name", async ({ _, expectedErrCode, license }) => {
            const xmlBuilder = new XMLBuilder();
            const obj = {
                license: xmlBuilder.build({
                    LicenseEntity: license,
                }),
            };
            const res = await request(httpServer).post("/auth-old").send(obj).expect(403);
    
            expect(res.body.success).toBe(false);
            expect(res.body.jwt).toBeFalsy();
            expect(res.body.errCode).toBe(expectedErrCode);
        });
    });

    describe("Admin requests", () => {
        it.each`
            reason                      |   b
            ${"all fields ok 1"}        |   ${{projName: "Project", maxClients: -1, clientTimeout: 0, expiration: new Date(2050, 8, 15)}}
            ${"all fields ok 2"}        |   ${{projName: "Project", maxClients: 3, clientTimeout: 5, expiration: new Date(2050, 8, 15)}}
        `("should generate a license ($reason)", async ({_, b}) => {
            const body: GenerateLicenseDto & {ts: number} = {
                ts: Date.now(),
                orgId: org.id,
                ...b
            };

            const res = await request(httpServer)
                .put("/admin/generate")
                .send(body)
                .expect(200);
            
            const resBody = res.body as LicenseGenerationResponse;
            license = {
                id: resBody.licenseId,
                ...b
            };
            expect(resBody.licenseId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        it.each`
            reason                      |   b
            ${"Missing project name"}   |   ${{maxClients: 10, clientTimeout: 5, expiration: new Date(2050, 8, 15)}}
            ${"Invalid org id"}         |   ${{projName: "Project", orgId: "aaasda", maxClients: 10, clientTimeout: 5, expiration: new Date(2050, 8, 15)}}
            ${"Invalid max clients"}    |   ${{projName: "Project", maxClients: -10, clientTimeout: 5, expiration: new Date(2050, 8, 15)}}
            ${"Invalid timeout 1"}      |   ${{projName: "Project", maxClients: 15, clientTimeout: -69, expiration: new Date(2050, 8, 15)}}
            ${"Invalid timeout 2"}      |   ${{projName: "Project", maxClients: 15, clientTimeout: 360, expiration: new Date(2050, 8, 15)}}
            ${"Invalid expiration"}     |   ${{projName: "Project", maxClients: 15, clientTimeout: 10, expiration: new Date(2010, 8, 15)}}
        `("should reject invalid body ($reason)", async ({_, b}) => {
            const body: GenerateLicenseDto & {ts: number} = {
                ts: Date.now(),
                orgId: org.id,
                ...b
            };

            await request(httpServer)
                .put("/admin/generate")
                .send(body)
                .expect(400);
        });
    });

    describe("Desktop requests", () => {
        process.env.TALOS_PGP_PUBKEY = "testing.pgp.pub";
        let jwts: string[] = [];

        it("should reject invalid PGP signature", async () => {
            const res = await request(httpServer)
                .put("/desktop/lock")
                .set("Content-Type", "text/plain")
                .send(`-----BEGIN PGP SIGNED MESSAGE-----
                Hash: SHA256
                
                {"ts":1682467383084}
                -----BEGIN PGP SIGNATURE-----
                
                iQEzBAEBCAAdFiEEwNExhwwk5Igv6yDwMrLeLLfshxEFAmRHR8EACgkQMrLeLLfs
                hxFRDQf/WjRA9gcobS/wlWaobnidk9E54QO0cKlbXqrcVKGO1L8Pdt+lwXaxxMrr
                B7GX+QmlJolKUt5Gb6mXvTgMQ9ME2zphkj6LKh0Zwn8Z0RerKBFPE7x5007sIg5a
                5Aw6sgYLjtza8kJMiMSDHH3JxQK0R+hqCBFzqS4pzGRXUE+hyqf0cf/9SEU57cJo
                N87JVPjFsbBBdcO2s44I+E49Hrakm4wxuwrUEUcTDvwlYhyvAJ41svMhZz6TAUKm
                eXaJPaPKjO9hWAtgfh53Yl6SWJzp/WwMfcwcvAn/f4fYepIS7hoNBRXutyI7qtIv
                kYY9HpdJQVB40mZ6bdJQAfMF8Q4Lnw==
                =yYZ3
                -----END PGP SIGNATURE-----`.replace(/^ +/gm, ''))
                .expect(401);
            expect(res.body.message).toMatch(/invalid signature/i);
        });

        it.each`
            reason              |   timedelta   |   msgRegex
            ${"too old"}        |   ${-30}      |   ${/internet connection may be unstable/i}
            ${"in the future"}  |   ${30}       |   ${/you're a time traveller/i}
        `("should reject invalid timestamp ($reason)", async ({_, timedelta, msgRegex}) => {
            const body = {
                ts: Date.now() + timedelta,
                otherProp: "Don't wanna know what kinda dress..."
            };

            const msg = await openpgp.createCleartextMessage({text: JSON.stringify(body)});
            const signedMsg = await openpgp.sign({
                message: msg,
                signingKeys: talosPrivateKey
            });

            const res = await request(httpServer)
                .put("/desktop/lock")
                .set("Content-Type", "text/plain")
                .send(signedMsg)
                .expect(401);

            expect(res.body.message).toMatch(msgRegex);
        });

        it.each`
            name                                        |   expectedStatusCode  |   clientId
            ${"successfully acquire a lock 1"}          |   ${200}              |   ${"haha, super random machine id :P"}
            ${"not acquire a lock already acquired"}    |   ${409}              |   ${"haha, super random machine id :P"}
            ${"successfully acquire a lock 2"}          |   ${200}              |   ${"Another random machine id"}
            ${"successfully acquire a lock 3"}          |   ${200}              |   ${"Yet another random machine id"}
            ${"not acquire a lock if limit is reached"} |   ${409}              |   ${"And... another random machine id"}
        `("should $name", async ({_, expectedStatusCode, clientId}) => {
            const body: AcquireLockDto & {ts: number} = {
                ts: Date.now(),
                licenseId: license.id,
                clientId: clientId
            };
            const signedMsg = await openpgp.sign({
                message: await openpgp.createCleartextMessage({text: JSON.stringify(body)}),
                signingKeys: talosPrivateKey
            });

            const res = await request(httpServer)
                .put("/desktop/lock")
                .set("Content-Type", "text/plain")
                .send(signedMsg)
                .expect(expectedStatusCode);
            
            if (!!res.body.jwt)
                jwts.push(res.body.jwt);
        });

        it("should successfully release all acquired locks", async () => {
            for (const jwt of jwts) {
                const body = {
                    ts: Date.now()
                };
                const signedMsg = await openpgp.sign({
                    message: await openpgp.createCleartextMessage({text: JSON.stringify(body)}),
                    signingKeys: talosPrivateKey
                });

                await request(httpServer)
                    .delete("/desktop/lock")
                    .set("Content-Type", "text/plain")
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(signedMsg)
                    .expect(200);
            }
        });
    });
});

const PRIVATE_KEY = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=9oeq
-----END PGP PRIVATE KEY BLOCK-----`;