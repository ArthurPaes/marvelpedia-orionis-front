export interface SignUp {
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface Checker {
  name: boolean;
  gender: boolean;
  birthDate: boolean;
  email: boolean;
  emailMatch: boolean;
  password: boolean;
  passwordConf: boolean;
  passwordMatch: boolean;
  checkbox: boolean;
}
