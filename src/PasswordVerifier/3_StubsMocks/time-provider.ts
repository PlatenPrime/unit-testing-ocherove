import moment from "moment";
import { PasswordError, Rule, TimeProviderInterface } from "../../types";

function RealTimeProvider(): TimeProviderInterface {
  return {
    getDay: () => moment().day(),
  };
}

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

export  interface PasswordVerifierI {
    rules: Rule[];
    timeProvider: TimeProviderInterface;
  
  }

export class PasswordVerifier implements PasswordVerifierI {
  rules: Rule[];
  timeProvider: TimeProviderInterface;

  constructor(rules: Rule[], timeProvider: TimeProviderInterface) {
    this.rules = rules;
    this.timeProvider = timeProvider;
  }
  verify(input: string):PasswordError[] {
    if ([SATURDAY, SUNDAY].includes(this.timeProvider.getDay())) {
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

const passwordVerifierFactory = (rules: Rule[]): PasswordVerifierI => {
  return new PasswordVerifier(rules, RealTimeProvider());
};
