import { describe, expect, test } from "vitest";
import { TimeProviderInterface } from "../../types";
import { PasswordVerifier } from "./time-provider2";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

class FakeTimeProvider implements TimeProviderInterface {
  fakeDay: number;
  constructor(fakeDay: number) {
    this.fakeDay = fakeDay;
  }
  getDay(): number {
    return this.fakeDay;
  }
}

describe("verifier with fakeTimeProvider", () => {
  test("on weekends, throws exceptions", () => {
    const stubTimeProvider = new FakeTimeProvider(SUNDAY);
    // stubTimeProvider.fakeDay = MONDAY;
    const verifier = new PasswordVerifier([], stubTimeProvider);
    expect(() => verifier.verify("any value")).toThrowError(/weekend/);
  });
});
