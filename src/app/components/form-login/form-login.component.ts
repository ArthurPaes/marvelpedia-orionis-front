import { Component } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent {
  login: { email: string; password: string } = { email: '', password: '' };
  checkboxValue = false;
  isFormValid = false;

  /**
   * Função para a mudança no valor do checkbox.
   * @param checked - O novo valor do checkbox.
   * @returns {void}
   */
  checkboxChange(checked: boolean): void {
    this.checkboxValue = checked;
  }

  /**
   * Função para a mudança no valor do campo de e-mail.
   * @param newValue - O novo valor do e-mail.
   * @returns {void}
   */
  emailValueChange(newValue: string): void {
    this.login.email = newValue;
    this.updateFormValidity();
  }

  /**
   * Função para a mudança no valor do campo de senha.
   * @param newValue - O novo valor da senha.
   * @returns {void}
   */
  passwordValueChange(newValue: string): void {
    this.login.password = newValue;
    this.updateFormValidity();
  }

  /**
   * Valida o formato do e-mail.
   * @returns {boolean}
   */
  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(this.login.email);
  }

  /**
   * Valida o comprimento da senha.
   * @returns {boolean}
   */
  validatePassword(): boolean {
    return this.login.password.length >= 8;
  }

  /**
   * Atualiza o status de validade do formulário(isFormValid) com base na validação do e-mail e senha.
   * @returns {void}
   */
  updateFormValidity(): void {
    this.isFormValid = this.validateEmail() && this.validatePassword();
  }

  /**
   * Envia as informações de login para o service.
   * @returns {void}
   */
  onSubmit(): void {
    //Função que irá enviar o objeto de login para o service
  }
}
