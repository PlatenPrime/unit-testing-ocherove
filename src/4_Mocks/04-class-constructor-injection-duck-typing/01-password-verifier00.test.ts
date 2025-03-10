import { describe, expect, it } from "vitest";
import { PasswordVerifier } from "./00-password-verifier00";


describe("duck typing with function constructor injection ", () => {
describe("password verifier", () => {
    it("given logger and passing scenario, calls logger with PASS", () => {
        let logged = "";
        const mockLog = {
            info: (text: string) => (logged = text)
        }
        const verifier = new PasswordVerifier([], mockLog);

        verifier.verify("any input");

        expect(logged).toMatch(/PASSED/);
    })
})
})
    