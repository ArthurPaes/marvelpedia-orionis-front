export interface IPasswordChecker {
  eightChars: boolean | null;
  oneLetter: boolean | null;
  oneNumber: boolean | null;
  oneSpecialChar: boolean | null;
}
export interface IRules {
  eightChars: string;
  oneLetter: string;
  oneNumber: string;
  oneSpecialChar: string;
}
