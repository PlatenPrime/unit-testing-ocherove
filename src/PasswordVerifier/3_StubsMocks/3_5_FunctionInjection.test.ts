import { describe, expect, test } from "vitest";
import { makeVerifier, verifyPassword3 } from "./verifyPassword3";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

describe("verifyPassword3", () => {
  test("on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    expect(() => verifyPassword3("any value", [], alwaysSunday)).toThrowError(
      /weekend/
    );
  });
});

describe("verifier,", () => {
  test("factory method: on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    const verifyPassword = makeVerifier([], alwaysSunday);
    expect(() => verifyPassword("any value")).toThrowError(/weekend/);
  });
});
