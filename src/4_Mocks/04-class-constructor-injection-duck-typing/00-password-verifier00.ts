interface Rule {
  (input: string): boolean;
}

export interface Logger {
  info?: (text: string) => void;
  debug?: (text: string) => void;
}

export class PasswordVerifier {
  #rules;
  #logger;

  constructor(rules: Rule[], logger: Logger) {
    this.#rules = rules;
    this.#logger = logger;
  }

  verify(input: string): boolean {
    const failed = this.#rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    console.log(failed);
    if (failed.length === 0) {
      this.#logger.info && this.#logger.info("PASSED");
      return true;
    }
    this.#logger.info && this.#logger.info("FAIL");
    return false;
  } 
}
