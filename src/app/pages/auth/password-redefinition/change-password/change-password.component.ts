import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPassword } from './interfaces/change-password.interface';
import { AuthApi } from 'src/app/core/api/app/auth.api';
import { IModalConfig } from '../../login/interface/login.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private authApi: AuthApi,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  modalConfig: IModalConfig = {
    showModal: false,
    icon: '',
    title: '',
    message: '',
    buttonText: '',
    overlayClick: true,
  };

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
  tokenExtractedFromURL: string | null = '';
  newPasswordValue = new Object();

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
      ? ((componentName.isAproved = true),
        (componentName.borderColor = '#2C85D8'))
      : ((componentName.isAproved = false),
        (componentName.borderColor = 'red'));
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
        (this.newPasswordValue = { newpassword: this.passwordConfirm.value }),
        (componentName.fieldsetLabel = 'Confirme sua senha'),
        (componentName.borderColor = '#2C85D8'))
      : ((componentName.isAproved = false),
        (componentName.fieldsetLabel = 'As senhas devem ser idênticas'),
        (componentName.borderColor = 'red'));
  };
  /**
   * handlePasswordSubmitSuccess
   *
   * Configura o modal para exibir a mensagem de erro.
   */
  handlePasswordSubmitSuccess(): void {
    this.modalConfig = {
      showModal: true,
      icon: 'check_circle_outline',
      title: 'Sucesso!',
      message: 'Sua senha foi modificada.',
      buttonText: 'FECHAR',
      overlayClick: false,
    };
  }
  /**
   * handlePasswordSubmitError
   *
   * Configura o modal para exibir a mensagem de erro.
   */
  handlePasswordSubmitError(message: string): void {
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
   * newPasswordSubmit
   * Submits the token and the new user password for validation and
   * haldles it´s sucess or fail.
   * @param tokenExtractedFromURL - Token extracted from the URL sended with redefiniton e-mail.
   * @param newPasswordValue - New password from confirmation input value.
   */
  async newPasswordSubmit(): Promise<any> {
    try {
      await this.authApi.sendNewPassword(
        this.tokenExtractedFromURL,
        this.newPasswordValue,
      );
      this.handlePasswordSubmitSuccess();
    } catch (e: any) {
      console.log(e);
      this.handlePasswordSubmitError(e.error.data);
    }
  }
  /**
   * closeModal
   *
   * Fecha o modal de acordo com um evento.
   * Se não houver erro, redireciona o usuário para a página Home.
   * @param event - O evento de fechamento do modal.
   */
  closeModal(event: boolean): void {
    this.modalConfig.showModal = event;
    this.router.navigate(['/login']);
  }
  /**
   * ngOnInit
   * Extracts the token value for the URL and assigns it to a variable.
   */
  ngOnInit(): void {
    this.tokenExtractedFromURL =
      this.activatedRoute.snapshot.queryParamMap.get('token');
  }
}
