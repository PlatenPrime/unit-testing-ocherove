const SUNDAY = 0,
  SATURDAY = 6;

export interface Rule {
  (input: string): {
    passed: boolean;
    reason: string;
  };
}

interface Verifier {
  verify(input: string): { passed: boolean; reason: string }[];
}


class VerifierImpl implements Verifier {
  private rules: Rule[];
  private dayOfWeekFn: () => number;

  constructor(rules: Rule[], dayOfWeekFn: () => number) {
    this.rules = rules;
    this.dayOfWeekFn = dayOfWeekFn;
  }

  verify(input: string): { passed: boolean; reason: string }[] {
    if ([SUNDAY, SATURDAY].includes(this.dayOfWeekFn())) {
      throw Error("Its the weekend");
    }

    const errors: { passed: boolean; reason: string }[] = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (!result.passed) {
        errors.push({ passed: false, reason: result.reason });
      }
    });
    return errors;
  }
}