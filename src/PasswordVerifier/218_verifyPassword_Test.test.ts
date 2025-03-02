import { describe, expect, test } from "vitest";
import { IPasswordVerifier, PasswordVerifier, Rule } from "./verifyPassword";

const oneUpperCaseRule: Rule = (input) => {
  return {
    passed: input.toLowerCase() !== input,
    reason: "should have at least one upper case letter",
  };
};

test(" verifier, with no rule, throw an exception", () => {
  const verifier = makeVerifier();
  expect(() => verifier.verify("any value")).toThrowError(
    /no rules configured/
  );
});

test(" verifier, with a failing rule, has an error message based on the rule.reason", () => {
  const verifier = makeVerifierWithFailingRule("fake reason");
  const errors = verifier.verify("any value");
  expect(errors[0]).toContain("fake reason");
});

test(" verifier, with a failing rule, has exactly one error", () => {
  const verifier = makeVerifierWithFailingRule("fake reason");
  const errors = verifier.verify("any value");
  expect(errors.length).toBe(1);
});

test(" verifier, with a passing rule, has no errors", () => {
  const verifier = makeVerifierWithPassingRule();
  const errors = verifier.verify("any value");
  expect(errors.length).toBe(0);
});

test(" verifier, with a passing and failing rule, has exactly one error", () => {
  const verifier = makeVerifierWithFailingRule("fake reason");
  verifier.addRule(makePassingRule());
  const errors = verifier.verify("any value");

  expect(errors.length).toBe(1);
});

test("  verifier, with a passing and failing rule, has an error message belongs to failed rule", () => {
  const verifier = makeVerifierWithFailingRule("fake reason");
  verifier.addRule(makePassingRule());
  const errors = verifier.verify("any value");

  expect(errors[0]).toContain("fake reason");
});

describe("one uppercase rule", () => {
  test.each([
    ["Abc", true],
    ["aBc", true],
  ])("given  %s, %s", (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toBe(expected);
  });
  test.each([["abc", false]])("given  %s, %s", (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toBe(expected);
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
