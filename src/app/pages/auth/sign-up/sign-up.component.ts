import { Component } from '@angular/core';
import { IFormatter } from './interfaces/sign-up.interface';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';
import { InputElement } from './InputData';
import { IRequestNewUser } from 'src/app/core/api/interfaces/INewUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private submitUser: UserRegisterApi) {}

  optionList: string[] = [
    'Mulher (cis ou trans)',
    'Homem (cis ou trans)',
    'Não Binário',
    'Prefiro não dizer',
  ];
  optionItem = this.optionList;

  btRegisterState = false;
  currentYear = new Date();

  showModal = false;
  modalMessage = '';
  handleError = true;

  firstName = new InputElement('firstname');
  lastName = new InputElement('lastname');
  gender = new InputElement('gender');
  birthDate = new InputElement('birthDate');
  email = new InputElement('email');
  password = new InputElement('password');
  passwordConfirmation = new InputElement('passwordConfirmation');
  checkbox = new InputElement('checkbox');

  regexList: IFormatter = {
    name: /^[a-zA-Z]{2,30}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
   * Handles the assignment of boolean data to input Element is Approval proprietary.
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  receiveStatus = (componentName: InputElement, eventValue: boolean) => {
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
            componentName.setBorderColor('#2C85D8'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('red'));
        break;
      case 'lastname':
        this.regexList.name.test(componentName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('red'));
        break;
      case 'email':
        this.regexList.email.test(componentName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('red'));
        break;
    }
    this.btEnabler();
  };
  /**
   * isfilledChecker
   * Handles verifications without comparison parameters. (ex. checkbox and select)
   * @param componentName The Input element name.
   * @param eventValue The event data ($event).
   */
  isfilledChecker = (componentName: InputElement, eventValue: string): void => {
    this.receiveData(componentName, eventValue);
    componentName.getValue().length != 0
      ? componentName.setIsAproved(true)
      : componentName.setIsAproved(false);
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
    const userYear =
      this.currentYear.getFullYear() -
      parseInt(componentName.getValue().slice(0, 4));
    userYear >= 10
      ? (componentName.setIsAproved(true),
        componentName.setBorderColor('#2C85D8'))
      : (componentName.setIsAproved(false),
        componentName.setBorderColor('red'));
    this.btEnabler();
  };
  /**
   * passwordMatchChecker
   * Handles the password match verification.
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
        componentName.setBorderColor('#2C85D8'))
      : (componentName.setIsAproved(false),
        componentName.setBorderColor('red'));
    this.btEnabler();
  };
  /**
   * signUpDataPackage
   * Submit signUpformData Object due Cadastrar onClick event.
   */
  signUpDataSubmit = (): void => {
    const signUpFormData: IRequestNewUser = {
      firstName: this.firstName.getValue(),
      lastName: this.lastName.getValue(),
      gender: this.gender.getValue().slice(3),
      birthDate: this.birthDate.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
    };

    this.submitUser
      .registerNewUser(signUpFormData)
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
