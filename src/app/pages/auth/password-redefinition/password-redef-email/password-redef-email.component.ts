import { Component } from '@angular/core';
import { PasswordRedefApi } from 'src/app/core/api/app/pwRedef.api';
@Component({
  selector: 'app-password-redef-email',
  templateUrl: './password-redef-email.component.html',
  styleUrls: ['./password-redef-email.component.scss'],
})
export class PasswordRedefEmailComponent {
  constructor(private sendEmail: PasswordRedefApi) {}

  showModal = false;
  modalMessage = '';
  handleError = true;

  emailValue = '';
  borderColor = '';
  isAproved = false;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  receiveData = (eventValue: string) => {
    this.emailValue = eventValue;
  };

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
        this.modalMessage = 'Login efetuado com sucesso!';
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
   *
   * Fecha o modal de acordo com um evento.
   * @param event - O evento de fechamento do modal.
   */
  closeModal(event: boolean): void {
    this.showModal = event;
  }
}
