import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { XMLBuilder } from "fast-xml-parser";
import * as request from "supertest";
import { LicensingModule } from "./../src/licensing.module";
import { AuthenticationErrorCode } from "./../src/models/error-codes";

describe("Licensing microservice (e2e)", () => {
    let app: INestApplication;
    let httpServer;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [LicensingModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => await app.close());

    it(`should successfully authenticate via /auth-old`, async () => {
            const xmlBuilder = new XMLBuilder();
            const obj = {
                "license": xmlBuilder.build({
                    "LicenseEntity": {
                        "UID": "5YHYXO-18D0YWH-1YNFW9B-1TELAPD",
                        "Type": "Single",
                        "CreateDateTime": new Date(2001, 7, 15).toISOString(),
                        "Signature": Buffer.from("7/15/3024").toString("base64"),
                        "LicensedTo": "SuperCompany:superfakeemail"
                    }
                })
            };
            const res = await request(httpServer)
                .post("/auth-old")
                .send(obj)
                .expect(200);

            expect(res.body.success).toBe(true);
            expect(res.body.jwt).toBeTruthy();
            expect(res.body.errCode).toBeFalsy();

            // validate JWT payload
            const jwtPayload = JSON.parse(
                Buffer.from(
                    res.body.jwt.split('.')[1],
                    "base64"
                ).toString()
            );
            expect(jwtPayload).toHaveProperty(["exp"]);
            expect(jwtPayload).toHaveProperty(["iat"]);
            expect(jwtPayload).toHaveProperty("licenseId", "OLD");
    });

    it.each`
        name                            |   expectedErrCode                         |   license
        ${"Missing fields"}             |   ${AuthenticationErrorCode.E_INVALID}    |   ${{}}
        ${"Invalid creation date"}      |   ${AuthenticationErrorCode.E_INVALID}    |   ${{UID: "jaja", Type: "dsf", CreateDateTime: "muahahaha", Signature: Buffer.from("7/15/3024").toString("base64"), LicensedTo: "sdh"}}
        ${"Expired license"}            |   ${AuthenticationErrorCode.E_EXPIRED}    |   ${{UID: "jaja", Type: "dsf", CreateDateTime: new Date(2001, 7, 15).toISOString(), Signature: Buffer.from("7/15/2022").toString("base64"), LicensedTo: "sdh"}}
        ${"Invalid expiracy date"}      |   ${AuthenticationErrorCode.E_INVALID}    |   ${{UID: "jaja", Type: "dsf", CreateDateTime: new Date(2001, 7, 15).toISOString(), Signature: new Date("7/7/2040").toISOString(), LicensedTo: "sdh"}}
        ${"Creation date in future"}    |   ${AuthenticationErrorCode.E_INVALID}    |   ${{UID: "jaja", Type: "dsf", CreateDateTime: new Date(2040, 7, 15).toISOString(), Signature: Buffer.from("7/15/2040").toString("base64"), LicensedTo: "sdh"}}
    `("should validate $name", async ({_, expectedErrCode, license}) => {
        const xmlBuilder = new XMLBuilder();
        const obj = {
            "license": xmlBuilder.build({
                "LicenseEntity": license
            })
        };
        const res = await request(httpServer)
            .post("/auth-old")
            .send(obj)
            .expect(403);

        expect(res.body.success).toBe(false);
        expect(res.body.jwt).toBeFalsy();
        expect(res.body.errCode).toBe(expectedErrCode);
    });
});
