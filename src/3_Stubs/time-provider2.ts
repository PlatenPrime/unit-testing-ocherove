import moment from "moment";
import {
  PasswordError,
  PasswordVerifierInterface,
  Rule,
  TimeProviderInterface,
} from "../../types";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

export class RealTimeProvider implements TimeProviderInterface {
  getDay(): number {
    return moment().day();
  }
}

export class PasswordVerifier implements PasswordVerifierInterface {
  timeProvider: TimeProviderInterface;
  rules: Rule[];
  constructor(rules: Rule[], timeProvider: TimeProviderInterface) {
    this.timeProvider = timeProvider;
    this.rules = rules;
  }

  verify(input: string): PasswordError[] {
    const isWeekend =
      [SUNDAY, SATURDAY].filter((x) => x === this.timeProvider.getDay())
        .length > 0;
    if (isWeekend) {
      throw new Error("It's the weekend");
    }
    const errors: PasswordError[] = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (!result.passed) {
        errors.push({ passed: false, reason: result.reason });
      }
    });
    return errors;
  }
}
