export interface IRequestlogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  date: string;
  status: boolean;
  data: string;
}
