import { describe, expect, it } from "vitest";
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
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = makeVerifierWithFailingRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      const verifier = makeVerifierWithFailingRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
  });

  describe("with a passing rule", () => {
    it("has no errors", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(0);
    });
  });

  describe("with a passing and failing rule", () => {
    it("has exactly one error", () => {
      const verifier = makeVerifierWithFailingRule("fake reason");
      verifier.addRule(makePassingRule());
      const errors = verifier.verify("any value");

      expect(errors.length).toBe(1);
    });

    it("has an error message belongs to failed rule", () => {
      const verifier = makeVerifierWithFailingRule("fake reason");
      verifier.addRule(makePassingRule());
      const errors = verifier.verify("any value");

      expect(errors[0]).toContain("fake reason");
    });
  });
});

function makeFailingRule(reason: string): Rule {
  return () => ({
    passed: false,
    reason,
  });
}

function makePassingRule(): Rule {
  return () => ({
    passed: true,
    reason: "",
  });
}

function makeVerifier(): IPasswordVerifier {
  return new PasswordVerifier();
}

function makeVerifierWithPassingRule(): IPasswordVerifier {
  const verifier = makeVerifier();
  verifier.addRule(makePassingRule());
  return verifier;
}

function makeVerifierWithFailingRule(reason: string): IPasswordVerifier {
  const verifier = makeVerifier();
  verifier.addRule(makeFailingRule(reason));
  return verifier;
}
