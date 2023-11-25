import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/core/api/app/auth.api';
import { ILogin } from './interface/login.interface';
import { IModalConfig } from './interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: ILogin = { email: '', password: '', rememberMe: false };
  isFormValid = false;
  loginError = false;
  modalConfig: IModalConfig = {
    showModal: false,
    icon: '',
    title: '',
    message: '',
    buttonText: '',
    overlayClick: true,
  };

  constructor(
    private authApi: AuthApi,
    private router: Router,
  ) {}

  /**
   * checkboxChange
   *
   * Função para a mudança no valor do checkbox.
   * @param checked - O novo valor do checkbox.
   */
  checkboxChange(checked: boolean): void {
    this.login.rememberMe = checked;
  }

  /**
   * emailValueChange
   *
   * Função para a mudança no valor do campo de e-mail.
   * @param newValue - O novo valor do e-mail.
   */
  emailValueChange(newValue: string): void {
    this.login.email = newValue;
    this.updateFormValidity();
  }

  /**
   * passwordValueChange
   *
   * Função para a mudança no valor do campo de senha.
   * @param newValue - O novo valor da senha.
   */
  passwordValueChange(newValue: string): void {
    this.login.password = newValue;
    this.updateFormValidity();
  }

  /**
   * validateEmail
   *
   * Valida o formato do e-mail.
   * @returns {boolean} retorna true caso o email esteja no formato correto
   */
  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(this.login.email);
  }

  /**
   * validatePassword

   * Valida o comprimento da senha.
   * @returns {boolean} retorna true caso a senha cumpra tenha mais de 7 caracteres
   */
  validatePassword(): boolean {
    return this.login.password.length >= 8;
  }

  /**
   * updateFormValidity
   *
   * Atualiza o status de validade do formulário(isFormValid) com base na validação do e-mail e senha.
   */
  updateFormValidity(): void {
    this.isFormValid = this.validateEmail() && this.validatePassword();
  }

  /**
   * handleLoginError
   *
   * Manipula o erro no login.
   * Indica que houve erro através da variável loginError e configura o modal para exibir a mensagem de erro.
   */
  handleLoginError(): void {
    this.loginError = true;
    this.modalConfig = {
      showModal: true,
      icon: 'error_outline',
      title: 'Erro!',
      message: 'E-mail ou senha inválidos!',
      buttonText: 'FECHAR',
      overlayClick: true,
    };
  }

  /**
   * onSubmit
   *
   * Envia as informações de login do usuário para o serviço.
   * Se o login for bem-sucedido, chama a função de manipulação de sucesso no login.
   * Se ocorrer um erro, chama a função de manipulação de erro no login.
   */
  async onSubmit(): Promise<void> {
    try {
      await this.authApi.authenticateUser(this.login);
      this.router.navigate(['/home']);
    } catch (error) {
      this.handleLoginError();
    }
  }

  /**
   * closeModal
   *
   * Fecha o modal de acordo com um evento.
   * Se não houver erro no login, redireciona o usuário para a página Home.
   * @param event - O evento de fechamento do modal.
   */
  closeModal(event: boolean): void {
    this.modalConfig.showModal = event;
  }
}
