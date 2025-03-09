import { describe, expect, it } from "vitest";
import { verifyPassword3 } from "./00-password-verifier00";

describe("password verifier", () => {
  describe("given logger and passing scenario", () => {
    it("call the logger with PASS", () => {
      let logged = "";
      const mockLog = {
        info: (text: string) => {
          logged = text;
        },
      };
      const injectedVerify = verifyPassword3([], mockLog);

      injectedVerify("anything");

      expect(logged).toMatch(/PASSED/);
    });
  });
});
