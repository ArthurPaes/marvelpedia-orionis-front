export interface PasswordChecker {
  eightChars: boolean | null;
  oneLetter: boolean | null;
  oneNumber: boolean | null;
  oneSpecialChar: boolean | null;
}
export interface Rules {
  eightChars: string;
  oneLetter: string;
  oneNumber: string;
  oneSpecialChar: string;
}
