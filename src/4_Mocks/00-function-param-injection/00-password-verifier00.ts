import { CurriedFunction3 } from "lodash";
import curry from "lodash/curry";
import * as log from "./complicated-logger";

interface Rule {
  (input: string): boolean;
}

export interface Logger {
  info?: (text: string) => void;
  debug?: (text: string) => void;
}

interface Verifier1 {
  (input: string, rules: Rule[]): boolean;
}

interface Verifier2 {
  (input: string, rules: Rule[], logger: Logger): boolean;
}

type Verifier3 = CurriedFunction3<Rule[], Logger, string, boolean>;

export const verifyPassword: Verifier1 = (input, rules) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);

  console.log(failed);
  if (failed.length === 0) {
    // this line is impossible to test with traditional injection techniques
    log.info("PASSED");
    return true;
  }
  // this line is impossible to test with traditional injection techniques
  log.info("FAIL");
  return false;
};

export const verifyPassword2: Verifier2 = (input, rules, logger) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);

  if (failed.length === 0) {
    logger.info && logger.info("PASSED");
    return true;
  }
  logger.info && logger.info("FAIL");
  return false;
};

export const verifyPassword3: Verifier3 = curry(
  (rules: Rule[], logger: Logger, input: string) => {
    const failed = rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    if (failed.length === 0) {
      logger.info && logger.info("PASSED");
      return true;
    }
    logger.info && logger.info("FAIL");
    return false;
  }
);
