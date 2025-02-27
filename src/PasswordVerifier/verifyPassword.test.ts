import { beforeEach, describe, expect, it } from "vitest";
import {
  IPasswordVerifier,
  PasswordVerifier,
  Rule,
  verifyPassword,
} from "./verifyPassword";

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
  let verifier: IPasswordVerifier;
  beforeEach(() => {
    verifier = new PasswordVerifier();
  });
  describe("with a failing rule", () => {
    let fakeRule: Rule;
    let errors: string[];
    beforeEach(() => {
      fakeRule = (input) => ({
        passed: false,
        reason: "fake reason",
      });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });
    it("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });

  describe("with a passing rule", () => {
    let fakeRule: Rule;
    let errors: string[];
    beforeEach(() => {
      fakeRule = (input) => ({
        passed: true,
        reason: "",
      });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });

  describe("with a passing and failing rule", () => {
    let fakeRulePass: Rule;
    let fakeRuleFail: Rule;
    let errors: string[];
    beforeEach(() => {
      fakeRulePass = (input) => ({
        passed: true,
        reason: "fake success",
      });
      fakeRuleFail = (input) => ({
        passed: false,
        reason: "fake reason",
      });
      verifier.addRule(fakeRuleFail);
      verifier.addRule(fakeRulePass);
      errors = verifier.verify("any value");
    });

    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });

    it("has an error message belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });

  });
});
