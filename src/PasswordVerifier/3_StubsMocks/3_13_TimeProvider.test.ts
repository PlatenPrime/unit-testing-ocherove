import { describe, expect, test } from "vitest";
import { TimeProviderInterface } from "../../types";
import { PasswordVerifier } from "./time-provider";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

function fakeTimeProvider(fakeDay: number): TimeProviderInterface {
  return {
    getDay: function () {
      return fakeDay;
    },
  };
}

describe("verifier with fakeTimeProvider", () => {
  test("on weekends, throws exceptions", () => {
    const verifier = new PasswordVerifier([], fakeTimeProvider(SUNDAY));
    expect(() => verifier.verify("any value")).toThrowError(/weekend/);
  });
});
