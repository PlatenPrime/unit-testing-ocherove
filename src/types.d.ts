export interface Rule {
  (input: string): {
    passed: boolean;
    reason: string;
  };
}

export interface Verifier {
  verify(input: string): { passed: boolean; reason: string }[];
}

interface TimeProviderInterface {
  getDay: () => number;
}

interface PasswordError {
  passed: boolean;
  reason: string;
}


interface PasswordVerifierInterface{
  rules: Rule[];
  timeProvider: TimeProviderInterface;

}