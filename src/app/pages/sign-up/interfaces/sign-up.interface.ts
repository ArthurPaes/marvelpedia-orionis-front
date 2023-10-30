export interface SignUp {
  name: string;
  lastName: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
  passwordConfirm: string;
  checkbox: string;
}

export interface Checker {
  name: boolean;
  lastName: boolean;
  gender: boolean;
  birthDate: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  passwordMatch: boolean;
  checkbox: boolean;
}

export interface Formatter {
  name: RegExp;
  lastName: RegExp;
  email: RegExp;
}
