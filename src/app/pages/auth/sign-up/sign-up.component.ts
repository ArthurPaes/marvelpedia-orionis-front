import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IFormatter } from './interfaces/sign-up.interface';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';
import { InputElement } from './InputData';
import { IRequestNewUser } from 'src/app/core/api/interfaces/INewUser';
import { InputComponent } from 'src/app/components/input/input.component';
import { SelectComponent } from 'src/app/components/select/select.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private userRegisterApi: UserRegisterApi) {}

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

  showModal = false;
  modalMessage = '';
  handleError = false;

  firstName = new InputElement('firstname');
  lastName = new InputElement('lastname');
  gender = new InputElement('gender');
  birthDate = new InputElement('birthDate');
  email = new InputElement('email');
  password = new InputElement('password');
  passwordConfirmation = new InputElement('passwordConfirmation');
  checkbox = new InputElement('checkbox');

  regexList: IFormatter = {
    name: /^[a-zàâãéêíïóôõöúçñ]+[\s]?[a-zàâãéêíïóôõöúçñ]+$/i,
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
            componentName.setBorderColor('#2C85D8'),
            componentName.setFieldLabel('Nome'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('#E38686'),
            componentName.setFieldLabel(
              'Seu nome pode ter 2 ou mais letras e apenas 1 espaço',
            ));
        break;
      case 'lastname':
        this.regexList.name.test(componentName.getValue())
          ? (componentName.setIsAproved(true),
            componentName.setBorderColor('#2C85D8'),
            componentName.setFieldLabel('Sobrenome'))
          : (componentName.setIsAproved(false),
            componentName.setBorderColor('#E38686'),
            componentName.setFieldLabel(
              'Seu sobrenome pode ter 2 ou mais letras e apenas 1 espaço',
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
    this.passwordMatchChecker(
      this.passwordConfirmation,
      this.passwordConfirmation.dataValue,
    );
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
        componentName.setBorderColor('#2C85D8'),
        componentName.setFieldLabel('Confirme sua senha'))
      : (componentName.setIsAproved(false),
        componentName.setBorderColor('#E38686'),
        componentName.setFieldLabel('As senhas devem ser idênticas'));
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
    this.userRegisterApi
      .registerNewUser(signUpFormData)
      .then(() => {
        this.modalMessage = 'Login efetuado com sucesso!';
        this.showModal = true;
      })
      .catch((error) => {
        this.modalMessage = error.error.data[0].msg;
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
  /**
   * cleanForm
   *
   * Reset form inputs value.
   */
  cleanForm(): void {
    this.inputComponents?.forEach((input) => {
      input.cleanInputValue();
    });
    this.selectComponent?.cleanSelectValue();
  }
  // fim da solução
}
