import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/core/api/app/auth.api';
import { IModalConfig } from '../../login/interface/login.interface';
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

  modalConfig: IModalConfig = {
    showModal: false,
    icon: '',
    title: '',
    message: '',
    buttonText: '',
    overlayClick: true,
  };

  loginError = false;
  showModal = false;
  modalMessage = '';

  emailValue = {
    email: '',
  };
  borderColor = '';
  isAproved = false;
  fieldsetLabel = 'E-mail';
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * receiveData
   * Handles the assignment of event data to  input Element object.
   * @param eventValue The event data ($event).
   */
  receiveData = (eventValue: string): void => {
    this.emailValue.email = eventValue;
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
      : ((this.isAproved = false),
        (this.fieldsetLabel = 'E-mail inválido'),
        (this.borderColor = '#E38686'));
  };
  /**
   * handleBackButton
   * Handles the navigation to login endpoint.
   */
  handleBackButton = (): void => {
    this.router.navigate(['login']);
  };
  /**
   * handleSignUpSuccess
   *
   * Configura o modal para exibir a mensagem de sucesso.
   */
  handleSignUpSuccess(): void {
    this.loginError = false;
    this.modalConfig = {
      showModal: true,
      icon: 'check_circle_outline',
      title: 'Sucesso!',
      message:
        'Se esse e-mail estiver valido, você receberá uma mensagem para recuperar sua senha!',
      buttonText: 'FECHAR',
      overlayClick: false,
    };
  }
  /**
   * handleSignUpError
   *
   * Configura o modal para exibir a mensagem de erro.
   */
  handleSignUpError(message: string): void {
    this.loginError = true;
    this.modalConfig = {
      showModal: true,
      icon: 'error_outline',
      title: 'Erro!',
      message: message,
      buttonText: 'FECHAR',
      overlayClick: true,
    };
  }
  /**
   * emailSubmit
   * Submit email value to back-end.
   */
  async emailSubmit(): Promise<any> {
    try {
      await this.authApi.sendPasswordResetEmail(this.emailValue);
      this.handleSignUpSuccess();
    } catch (e: any) {
      this.handleSignUpError(e.error.data[0].msg);
    }
  }
  /**
   * closeModal
   * Fecha o modal de acordo com um evento.
   * @param event - O evento de fechamento do modal.
   */
  closeModal(event: boolean): void {
    this.showModal = event;
    this.router.navigate(['/login']);
  }
}
