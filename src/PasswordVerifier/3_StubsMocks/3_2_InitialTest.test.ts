import moment from "moment";
import { describe, expect, test } from "vitest";
import { verifyPassword } from "./verifyPassword";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 2;

describe("verifyPassword", () => {
  const TODAY = moment().day();
//   const TODAY = 4
  test("on weekends, throws esceptions", () => {
    if ([SUNDAY, SATURDAY].includes(TODAY)) {
      expect(() => verifyPassword("any value", [])).toThrowError(/weekend/);
    }
  });
  if ([SUNDAY, SATURDAY].includes(TODAY)) {
    test("on weekends, throws esceptions", () => {
      expect(() => verifyPassword("any value", [])).toThrowError(/weekend/);
    });
  }
});
