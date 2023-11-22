export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IModalConfig {
  showModal: boolean;
  icon: string;
  title: string;
  message: string;
  buttonText: string;
  overlayClick: boolean;
}
