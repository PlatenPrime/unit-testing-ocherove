import { describe, expect, it } from "vitest";
import { PasswordVerifier, Rule, verifyPassword } from "./verifyPassword";

describe("verifyPassword", () => {
  describe("given a failing rule", () => {
    const fakeRule: Rule = () => ({
      passed: false,
      reason: "fake reason",
    });
    it("returns errors", () => {
      const errors = verifyPassword("any value", [fakeRule]);

      expect(errors[0]).toContain("fake reason");
    });
  });
});

describe("PasswordVerifier", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier();

      const fakeRule: Rule = () => ({
        passed: false,
        reason: "fake reason",
      });

      verifier.addRule(fakeRule);

      const errors = verifier.verify("any value");

      expect(errors[0]).toContain("fake reason");
    });
  });
});
