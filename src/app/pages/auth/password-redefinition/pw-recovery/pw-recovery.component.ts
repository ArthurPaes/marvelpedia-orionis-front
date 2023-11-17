import { Component } from '@angular/core';
import { PasswordRedefApi } from 'src/app/core/api/app/pwRedef.api';
@Component({
  selector: 'app-pw-recovery',
  templateUrl: './pw-recovery.component.html',
  styleUrls: ['./pw-recovery.component.scss'],
})
export class PwRecoveryComponent {
  constructor(private sendEmail: PasswordRedefApi) {}

  showModal = false;
  modalMessage = '';
  handleError = true;

  emailValue = '';
  borderColor = '';
  isAproved = false;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * receiveData
   * Handles the assignment of event data to  input Element object.
   * @param eventValue The event data ($event).
   */
  receiveData = (eventValue: string) => {
    this.emailValue = eventValue;
  };
  /**
   * regexFormatChecker
   * Handles email verification usin a regExp.
   * @param eventValue The event data ($event).
   */
  emailChecker = (eventValue: string) => {
    this.receiveData(eventValue);
    this.emailRegex.test(eventValue)
      ? ((this.isAproved = true), (this.borderColor = '#2C85D8'))
      : ((this.isAproved = false), (this.borderColor = '#E38686'));
  };
  /**
   * signUpDataPackage
   * Submit signUpformData Object due Cadastrar onClick event.
   */
  sendEmailSubmit = (): void => {
    this.sendEmail
      .pwRedefSendEmail(this.emailValue)
      .then(() => {
        this.modalMessage = (
            'Verifique seu e-mail. Nós enviamos um link para você cadastrar uma nova senha.'
          );
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
}
