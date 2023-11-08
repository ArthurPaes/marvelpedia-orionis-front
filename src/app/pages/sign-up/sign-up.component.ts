import { Component } from '@angular/core';
import { IFormatter } from './interfaces/sign-up.interface';
import { UserRegisterApi } from '../../core/api/app/new.user.api';
import { InputElement } from './InputData';
import { IRequestNewUser } from '../../core/api/interfaces/INewUser';

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
   * btDissabler
   * Toggles the Register button between anabled/disabled states.
   */
  btDissabler = (): void => {
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
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  receiveData = (inputName: InputElement, eventValue: string): void => {
    inputName.setValue(eventValue);
  };
  /**
   * receiveStatus
   * Handles the assignment of boolean data to input Element is Approval proprietary.
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  receiveStatus = (inputName: InputElement, eventValue: boolean) => {
    inputName.setIsAproved(eventValue);
    this.btDissabler();
  };
  /**
   * regexFormatChecker
   * Handles the requisites verification of inputs that uses regex as parameters.
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  regexFormatChecker = (inputName: InputElement, eventValue: string): void => {
    this.receiveData(inputName, eventValue);
    switch (inputName.getType()) {
      case 'firstname':
        this.regexList.name.test(inputName.getValue())
          ? (inputName.setIsAproved(true), inputName.setBorderColor('#2C85D8'))
          : (inputName.setIsAproved(false), inputName.setBorderColor('red'));
        break;
      case 'lastname':
        this.regexList.name.test(inputName.getValue())
          ? (inputName.setIsAproved(true), inputName.setBorderColor('#2C85D8'))
          : (inputName.setIsAproved(false), inputName.setBorderColor('red'));
        break;
      case 'email':
        this.regexList.email.test(inputName.getValue())
          ? (inputName.setIsAproved(true), inputName.setBorderColor('#2C85D8'))
          : (inputName.setIsAproved(false), inputName.setBorderColor('red'));
        break;
    }
    this.btDissabler();
  };
  /**
   * isfilledChecker
   * Handles verifications without comparison parameters. (ex. checkbox and select)
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  isfilledChecker = (inputName: InputElement, eventValue: string): void => {
    this.receiveData(inputName, eventValue);
    inputName.getValue().length != 0
      ? inputName.setIsAproved(true)
      : inputName.setIsAproved(false);
    this.btDissabler();
  };
  /**
   * birthYearChecker
   * Handles the minimum age verification.
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  birthYearChecker = (inputName: InputElement, eventValue: string): void => {
    this.receiveData(inputName, eventValue);
    const userYear =
      this.currentYear.getFullYear() -
      parseInt(inputName.getValue().slice(0, 4));
    userYear >= 10
      ? inputName.setIsAproved(true)
      : inputName.setIsAproved(false);
    this.btDissabler();
  };
  /**
   * passwordMatchChecker
   * Handles the password match verification.
   * @param inputName The Input element name.
   * @param eventValue The event data ($event).
   */
  passwordMatchChecker = (
    inputName: InputElement,
    eventValue: string,
  ): void => {
    this.receiveData(inputName, eventValue);
    inputName.getValue() == this.password.getValue()
      ? (inputName.setIsAproved(true), inputName.setBorderColor('#2C85D8'))
      : (inputName.setIsAproved(false), inputName.setBorderColor('red'));
    this.btDissabler();
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
      .then(() => console.log('sucesso'))
      .catch(() => console.log('error'))
      .finally(() => console.log('Finaly'));
  };
}
