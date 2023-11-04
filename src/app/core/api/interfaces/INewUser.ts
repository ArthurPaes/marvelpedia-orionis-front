export interface IRequestNewUser {
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface IResponseNewUser {
  date: string;
  status: boolean;
  data: {
    id: number;
    name: string;
    gender: string;
    birthDate: string;
    email: string;
    createdAt: string;
    lastUpdate: string;
    isActivated: boolean;
  };
}
