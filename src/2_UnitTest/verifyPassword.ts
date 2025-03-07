import moment from "moment";



export interface Rule {
  (input: string): {
    passed: boolean;
    reason: string;
  };
}

export const verifyPassword = (input: string, rules: Rule[]): string[] => {
  const dayOfWeek = moment().day();

  // if ([SUNDAY, SATURDAY].includes(dayOfWeek)) {
  //   throw Error("Its the weekend");
  // }

  const errors: string[] = [];
  rules.forEach((rule) => {
    const result = rule(input);
    if (!result.passed) {
      errors.push(`error ${result.reason}`);
    }
  });
  return errors;
};

export interface IPasswordVerifier {
  rules: Rule[];
  addRule(rule: Rule): void;
  verify(input: string): string[];
}

export class PasswordVerifier implements IPasswordVerifier {
  rules: Rule[];
  constructor() {
    this.rules = [];
  }

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  verify(input: string) {
    if (this.rules.length === 0) {
      throw new Error("There are no rules configured");
    }
    const errors: string[] = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (!result.passed) {
        errors.push(`error ${result.reason}`);
      }
    });
    return errors;
  }
}
