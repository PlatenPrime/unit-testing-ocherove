const SUNDAY = 0,
  SATURDAY = 6;

export interface Rule {
  (input: string): {
    passed: boolean;
    reason: string;
  };
}

export interface Verifier3 {
  (input: string, rules: Rule[], getDayFn: () => number): string[];
}

export const verifyPassword3: Verifier3 = (input, rules, getDayFn) => {
  const dayOfWeek = getDayFn();
  if ([SUNDAY, SATURDAY].includes(dayOfWeek)) {
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

export interface MakeVerifier {
  (rules: Rule[], getDayOfWeekFn: () => number): (input: string) => string[];
}

export const makeVerifier: MakeVerifier = (rules, getDayOfWeekFn) => {
  return function (input) {
    if ([SUNDAY, SATURDAY].includes(getDayOfWeekFn())) {
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
};
