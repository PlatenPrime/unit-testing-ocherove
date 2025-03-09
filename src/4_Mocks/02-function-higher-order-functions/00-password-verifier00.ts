interface Rule {
  (input: string): boolean;
}

export interface Logger {
  info?: (text: string) => void;
  debug?: (text: string) => void;
}

export const makeVerifier = (rules: Rule[], logger: Logger) => {
  return (input: string) => {
    const failed = rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    console.log(failed);
    if (failed.length === 0) {
      logger.info && logger.info("PASSED");
      return true;
    }
    logger.info && logger.info("FAIL");
    return false;
  };
};

