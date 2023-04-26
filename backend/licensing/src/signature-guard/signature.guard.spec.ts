import { Test, TestingModule } from "@nestjs/testing";
import { SignatureGuard } from "./signature.guard";
import { createMock } from "@golevelup/ts-jest";

describe("SignatureGuard", () => {
    it("should be defined", () => {
        expect(new SignatureGuard()).toBeDefined();
    });
});
