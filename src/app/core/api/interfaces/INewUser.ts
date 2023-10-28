export interface IRequestNewUser {
  name: string;
  DoB: string;
  genero: string;
  senha: string;
  senhaConfirm: string;
  checkbox: boolean;
}

export interface IResponseNewUser {
  date: string;
  status: boolean;
  data: string;
}
