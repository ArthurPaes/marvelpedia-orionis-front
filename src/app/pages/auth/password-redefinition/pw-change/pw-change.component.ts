import { Component } from '@angular/core';
import { PasswordRedefApi } from 'src/app/core/api/app/pwRedef.api';
import { IPassword } from './interfaces/pw-change.interface';

@Component({
  selector: 'app-pw-change',
  templateUrl: './pw-change.component.html',
  styleUrls: ['./pw-change.component.scss'],
})
export class PwChangeComponent {
  constructor(private sendNewPassword: PasswordRedefApi) {}

  showModal = false;
  modalMessage = '';
  handleError = true;

  password: IPassword = {
    value: '',
    borderColor: '',
    isAproved: false,
  };
  passwordConfirm: IPassword = {
    value: '',
    borderColor: '',
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
   * receiveStatus
   * Handles the assignment of a boolean data to the object isApproval property.
   * @param componentName The object name.
   * @param eventValue The event data ($event).
   */
  receiveStatus = (componentName: IPassword, eventValue: boolean) => {
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
        (componentName.borderColor = '#2C85D8'))
      : ((componentName.isAproved = false),
        (componentName.borderColor = 'red'));
  };
  /**
   * signUpDataPackage
   * Submit signUpformData Object due Cadastrar onClick event.
   */
  sendNewPwSubmit = (): void => {
    this.sendNewPassword
      .pwRedef(this.passwordConfirm.value)
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
