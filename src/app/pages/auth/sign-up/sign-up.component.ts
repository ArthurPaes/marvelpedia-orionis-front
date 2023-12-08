import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IFormatter } from './interfaces/sign-up.interface';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';
import { InputElement } from './InputData';
import { IRequestNewUser } from 'src/app/core/api/interfaces/INewUser';
import { IModalConfig } from '../login/interface/login.interface';
import { InputComponent } from 'src/app/components/input/input.component';
import { SelectComponent } from 'src/app/components/select/select.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private userRegisterApi: UserRegisterApi,
    private router: Router,
  ) {}

  @ViewChildren(InputComponent) inputComponents?: QueryList<InputComponent>;
  @ViewChild(SelectComponent) selectComponent?: SelectComponent;

  optionList: string[] = [
    'Mulher (cis ou trans)',
    'Homem (cis ou trans)',
    'Não Binário',
    'Prefiro não dizer',
  ];
  optionItem = this.optionList;

  btRegisterState = false;
  currentYear = new Date();
  passwordCheckerReload = false;

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

  firstName = new InputElement('firstname');
  lastName = new InputElement('lastname');
  gender = new InputElement('gender');
  birthDate = new InputElement('birthDate');
  email = new InputElement('email');
  password = new InputElement('password');
  passwordConfirmation = new InputElement('passwordConfirmation');
  checkbox = new InputElement('checkbox');

  regexList: IFormatter = {
    name: /^[a-zàáâãéêíïóôõöúçñ]+[\s]?[a-zàáâãéêíïóôõöúçñ]+$/i,
    lastName: /^[a-zA-ZÀ-Úàáâãéêíïóôõöúçñ ]+$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };
  /**
   * handleBackButton
   * Handles the navigation to login endpoint.
   */
  handleBackButton = (): void => {
    this.router.navigate(['login']);
  };
  /**
   * btEnabler
   * Toggles the Register button between anabled/disabled states.
   */
  btEnabler = (): void => {
    this.firstName.getIsAproved() &&
    this.lastName.getIsAproved() &&
    this.gender.getIsAproved() &&
    this.birthDate.getIsAproved() &&
    this.email.getIsAproved() &&
    this.password.getIsAproved() &&
    this.passwordConfirmation.getIsAproved() &&
    this.checkbox.getIsAproved()
      ? (this.btRegisterState = true)
      : (this.btRegisterState = false);
  };
  /**
   * receiveData
   * Handles the assignment of event data to  input Element object.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  receiveData = (componentName: InputElement, eventValue: string): void => {
    componentName.setValue(eventValue);
  };
  /**
   * receiveStatus
   * Handles the assignment of boolean data to input Element isApproval property.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  receiveStatus = (componentName: InputElement, eventValue: boolean): void => {
    componentName.setIsAproved(eventValue);
    this.btEnabler();
  };
  /**
   * regexFormatChecker
   * Handles the requisites verification of inputs that uses regex as parameters.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  regexFormatChecker = (
    componentName: InputElement,
    eventValue: string,
  ): void => {
    this.receiveData(componentName, eventValue);
    switch (componentName.getType()) {
      case 'firstname':
        this.regexList.name.test(componentName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'),
            componentName.setFieldLabel('Nome'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('#E38686'),
            componentName.setFieldLabel(
              'Seu nome pode conter apenas letras e somente 2 nomes.',
            ));
        break;
      case 'lastname':
        this.regexList.lastName.test(this.lastName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'),
            componentName.setFieldLabel('Sobrenome'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('#E38686'),
            componentName.setFieldLabel(
              'Seu sobrenome pode conter apenas letras',
            ));
        break;
      case 'email':
        this.regexList.email.test(componentName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'),
            componentName.setFieldLabel('E-mail'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('#E38686'),
            componentName.setFieldLabel('E-mail inválido'));
        break;
    }
    this.btEnabler();
  };
  /**
   * passwordChecker
   * Checks if the input value isn't empty.
   * @param eventValue The event data ($event).
   */
  passwordChecker = (eventValue: string): void => {
    this.receiveData(this.password, eventValue);
    this.password.getValue().length != 0
      ? this.password.setIsAproved(true)
      : this.password.setIsAproved(false);
    this.passwordMatchChecker(
      this.passwordConfirmation,
      this.passwordConfirmation.dataValue,
    );
    this.btEnabler();
  };
  /**
   * genreChecker
   * Checks if the input value isn't empty.
   * @param eventValue The event data ($event).
   */
  genreChecker = (eventValue: string): void => {
    this.receiveData(this.gender, eventValue);
    this.gender.getValue().length != 0
      ? this.gender.setIsAproved(true)
      : this.gender.setIsAproved(false);
    this.btEnabler();
  };
  /**
   * birthYearChecker
   * Handles the minimum age verification.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  birthYearChecker = (
    componentName: InputElement,
    eventValue: string,
  ): void => {
    this.receiveData(componentName, eventValue);
    const userAge =
      this.currentYear.getFullYear() -
      parseInt(componentName.getValue().slice(0, 4));
    userAge >= 10
      ? (componentName.setIsAproved(true),
        componentName.setBorderColor('#2C85D8'),
        componentName.setFieldLabel('Data de Nascimento'))
      : (componentName.setIsAproved(false),
        componentName.setBorderColor('#E38686'),
        componentName.setFieldLabel('Deve ser MAIOR de 10 anos!'));
    this.btEnabler();
  };
  /**
   * passwordMatchChecker
   * Checks if passoword confirmation input and password input are matching.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  passwordMatchChecker = (
    componentName: InputElement,
    eventValue: string,
  ): void => {
    this.receiveData(componentName, eventValue);
    componentName.getValue() == this.password.getValue()
      ? (componentName.setIsAproved(true),
        componentName.setBorderColor('#2C85D8'),
        componentName.setFieldLabel('Confirme sua senha'))
      : (componentName.setIsAproved(false),
        componentName.setBorderColor('#E38686'),
        componentName.setFieldLabel('As senhas devem ser idênticas'));
    this.btEnabler();
    this.passwordCheckerReload = false;
  };
  /**
   * handleFormRefresh
   *
   * Sets all inputs aproved property to orinial state (false).
   */
  handleFormRefresh(): void {
    this.firstName.setIsAproved(false);
    this.lastName.setIsAproved(false);
    this.gender.setIsAproved(false);
    this.birthDate.setIsAproved(false);
    this.email.setIsAproved(false);
    this.password.setIsAproved(false);
    this.passwordConfirmation.setIsAproved(false);
  }
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
      title: 'Cadastro finalizado!',
      message: 'Verifique sua caixa de e-mail.',
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
   * signUpDataSubmit
   * Submit signUpformData Object due button onClick event.
   */
  async signUpDataSubmit(): Promise<void> {
    const signUpFormData: IRequestNewUser = {
      firstName: this.firstName.getValue(),
      lastName: this.lastName.getValue(),
      gender: this.gender.getValue().slice(3),
      birthDate: this.birthDate.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
    };
    try {
      await this.userRegisterApi.registerNewUser(signUpFormData);
      this.handleSignUpSuccess();
    } catch (e: any) {
      this.handleSignUpError(e.error.data[0].msg);
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
    if (!this.loginError) {
      this.router.navigate(['/login']);
    }
    this.modalConfig.showModal = event;
  }

  // Solução criada por Rafael Horauti para soluciona o requisito
  // de limpar os inputs do formulário ao clicar no botão limpar;
  /**
   * cleanForm
   *
   * Reset form inputs value.
   */
  cleanForm(): void {
    this.passwordCheckerReload = true;
    this.inputComponents?.forEach((input) => {
      input.cleanInputValue();
    });
    this.selectComponent?.cleanSelectValue();
    this.handleFormRefresh();
  }
  // fim da solução
}
