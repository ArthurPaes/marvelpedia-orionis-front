import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/core/api/app/auth.api';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  constructor(
    private authApi: AuthApi,
    private router: Router,
  ) {}

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
  receiveData = (eventValue: string): void => {
    this.emailValue = eventValue;
  };
  /**
   * emailChecker
   * Handles email verification usin a regExp.
   * @param eventValue The event data ($event).
   */
  emailChecker = (eventValue: string): void => {
    this.receiveData(eventValue);
    this.emailRegex.test(eventValue)
      ? ((this.isAproved = true), (this.borderColor = '#2C85D8'))
      : ((this.isAproved = false), (this.borderColor = '#E38686'));
  };
  /**
   * handleBackButton
   * Handles the navigation to login endpoint.
   */
  handleBackButton = (): void => {
    this.router.navigate(['login']);
  };
  /**
   * sendEmailSubmit
   * Submit email value to back-end.
   */
  sendEmailSubmit = (): void => {
    this.authApi
      .sendPasswordResetEmail(this.emailValue)
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
}
