import { describe, expect, test } from "vitest";
import { PasswordVerifier, Rule, Verifier } from "./verifyPassword4";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

interface VerifierMaker {
  (rules: Rule[], dayFn: () => number): Verifier;
}

describe("refactored with constructor", () => {
  const makeVerifier: VerifierMaker = (rules, dayFn) =>
    new PasswordVerifier(rules, dayFn);

  test("class constructor: on weekends, throws exception", () => {
    const alwaysSunday = () => SUNDAY;

    const verifier = makeVerifier([], alwaysSunday);
    expect(() => verifier.verify("any value")).toThrowError(/weekend/);
  });

  test("class constructor: on weekdays, with no rules, passses", () => {
    const alwaysMonday = () => MONDAY;
    const verifier = makeVerifier([], alwaysMonday);

    const result = verifier.verify("any value");
    expect(result.length).toBe(0);
  });
});
