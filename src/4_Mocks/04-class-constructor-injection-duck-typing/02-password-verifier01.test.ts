import { describe, expect, it } from "vitest";
import { PasswordVerifier } from "./00-password-verifier00";

class FakeLogger {
  logged = "";

  info(text: string): void {
    this.logged = text;
  }
}

describe("duck typing with function constructor injection ", () => {
  describe("password verifier", () => {
    it("given logger and passing scenario, calls logger with PASS", () => {
      const mockLog = new FakeLogger();

      const verifier = new PasswordVerifier([], mockLog);

      verifier.verify("any input");

      expect(mockLog.logged).toMatch(/PASSED/);
    });
  });
});
