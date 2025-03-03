const SUNDAY = 0,
  SATURDAY = 6;

export interface Rule {
  (input: string): {
    passed: boolean;
    reason: string;
  };
}

export interface Verifier2 {
  (input: string, rules: Rule[], currentDay: number): string[];
}

export const verifyPassword2: Verifier2 = (input, rules, currentDay) => {
  if ([SUNDAY, SATURDAY].includes(currentDay)) {
    throw Error("Its the weekend");
  }

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
