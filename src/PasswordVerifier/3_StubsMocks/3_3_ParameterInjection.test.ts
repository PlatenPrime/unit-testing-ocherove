import { describe, expect, test } from "vitest";
import { verifyPassword2 } from "./verifyPassword2";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

describe("verifyPassword2", () => {
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword2("any value", [], SUNDAY)).toThrowError(
      /weekend/
    );
  });
});
