export interface IChecker {
  firstName: boolean;
  lastName: boolean;
  gender: boolean;
  birthDate: boolean;
  email: boolean;
  password: boolean;
  passwordConfirmation: boolean;
  checkbox: boolean;
}

export interface IFormatter {
  name: RegExp;
  lastName: RegExp;
  email: RegExp;
}
