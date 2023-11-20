import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IPassword } from './interfaces/change-password.interface';
import { AuthApi } from 'src/app/core/api/app/auth.api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private authApi: AuthApi,
    private router: Router,
  ) {}

  showModal = false;
  modalMessage = '';
  handleError = true;

  password: IPassword = {
    value: '',
    borderColor: '',
    fieldsetLabel: '',
    isAproved: false,
  };
  passwordConfirm: IPassword = {
    value: '',
    borderColor: '',
    fieldsetLabel: '',
    isAproved: false,
  };
  /**
   * receiveData
   * Handles the assignment of event data to the object.
   * @param componentName The object name.
   * @param eventValue The event data ($event).
   */
  receiveData = (componentName: IPassword, eventValue: string): void => {
    componentName.value = eventValue;
  };
  /**
   * handleBackButton
   * Handles the navigation to login endpoint.
   */
  handleBackButton = (): void => {
    this.router.navigate(['login']);
  };
  /**
   * receiveStatus
   * Handles the assignment of a boolean data to the object isApproval property.
   * @param componentName The object name.
   * @param eventValue The event data ($event).
   */
  receiveStatus = (componentName: IPassword, eventValue: boolean): void => {
    componentName.isAproved = eventValue;
  };
  /**
   * isfilledChecker
   * Checks if the input is filled.
   * @param componentName The Input The object name.
   * @param eventValue The event data ($event).
   */
  isfilledChecker = (componentName: IPassword, eventValue: string): void => {
    this.receiveData(componentName, eventValue);
    componentName.value.length != 0
      ? (componentName.isAproved = true)
      : (componentName.isAproved = false);
  };
  /**
   * passwordMatchChecker
   * Checks if the password confirmation input matchs with password input.
   * @param componentName The Input The object name.
   * @param eventValue The event data ($event).
   */
  passwordMatchChecker = (
    componentName: IPassword,
    eventValue: string,
  ): void => {
    this.receiveData(componentName, eventValue);
    componentName.value == this.password.value
      ? ((componentName.isAproved = true),
        (componentName.fieldsetLabel = 'Confirme sua senha'),
        (componentName.borderColor = '#2C85D8'))
      : ((componentName.isAproved = false),
        (componentName.fieldsetLabel = 'As senhas devem ser idênticas'),
        (componentName.borderColor = 'red'));
  };
  /**
   * signUpDataPackage
   * Submit signUpformData Object due Cadastrar onClick event.
   */
  newPasswordSubmit = (): void => {
    this.authApi
      .sendNewPassword(this.passwordConfirm.value)
      .then(() => {
        this.modalMessage =
          'Verifique seu e-mail. Nós enviamos um link para você cadastrar uma nova senha.';
        this.showModal = true;
      })
      .catch((error) => {
        this.modalMessage = error.error.data;
        this.showModal = true;
        this.handleError = true;
      });
  };
  /**
   * closeModal
   * Fecha o modal de acordo com um evento.
   * @param event - O evento de fechamento do modal.
   */
  closeModal(event: boolean): void {
    this.showModal = event;
  }
  // Solução criada por Rafael Horauti para soluciona o requisito
  // de limpar os inputs do formulário ao clicar no botão limpar;
  cleanInput = '';
  count = 0;

  /**
   * limparInput
   *
   * Reset form inputs value.
   */
  limparInput(): void {
    this.cleanInput = 'true' + this.count;
    this.count++;
  }
  // fim da solução
}
