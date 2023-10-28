export interface IRequestNewUser {
  name: string;
  gender: string;
  birth_date: string;
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
    birth_date: string;
    email: string;
    created_at: string;
    last_update: string;
    isActivated: boolean;
  };
}
