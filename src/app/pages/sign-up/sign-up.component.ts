import { Component } from '@angular/core';
import { Checker, SignUp, Formatter } from './interfaces/sign-up.interface';
import { UserRegisterApi } from 'src/app/core/api/app/new.user.api';

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

  today = new Date();

  signUpformData: SignUp = <SignUp>new Object();

  isFilled: Checker = <Checker>{
    name: false,
    lastName: false,
    gender: false,
    birthDate: false,
    email: false,
    password: true,
    passwordConfirm: true,
    passwordMatch: true,
    checkbox: false,
  };
  regexList: Formatter = {
    name: /^[a-zA-Z]{2,30}$/,
    lastName: /^[a-zA-Z]{2,30}$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };
  borderColor: SignUp = <SignUp>new Object();
  /**
   * btRegisterState
   * Toggles the Register button between anabled/disabled states.
   */
  btDissabler = (): void => {
    this.btRegisterState = Object.values(this.isFilled).reduce(
      (a, c) => a && c,
    );
  };
  /**
   * checkIsFilled
   * Assigns the current filling state of a input.
   * @param eventValue: The value of a received event.
   * @param prop: A property of isFilled.
   */
  checkIsFilled = (inputValue: string, inputName: keyof Checker): void => {
    inputValue.length !== 0 || undefined
      ? (this.isFilled[inputName] = true)
      : (this.isFilled[inputName] = false);
  };
  /**
   * emaildFormatChecker
   * Checks e-mail input value for emailRegex variable format.
   * @param emailData: Email input data value.
   */
  regexFormatChecker = (inputName: keyof Formatter & keyof Checker): void => {
    this.regexList[inputName].test(this.signUpformData[inputName])
      ? ((this.borderColor[inputName] = '#2C85D8'),
        this.checkIsFilled(this.signUpformData[inputName], inputName))
      : ((this.borderColor[inputName] = 'red'),
        (this.isFilled[inputName] = false));
  };
  /**
   * birthDateChecker
   * Checks the input data to check if user is older than 10 years old.
   */
  birthDateChecker = (): void => {
    parseInt(this.signUpformData.birthDate.slice(0, 4)) <=
    this.today.getFullYear()
      ? ((this.borderColor.birthDate = '#2C85D8'),
        this.checkIsFilled(this.signUpformData.birthDate, 'birthDate'))
      : (this.borderColor.birthDate = 'red');
  };
  /**
   * receiveDataOnChange
   * Recives the data emitted from app-input component and assigns it
   * to signUpformData object.
   * @param eventValue The event data emmited from componente, usually ($event)
   * @param compName The componente name thas is been handled
   */
  receiveDataOnChange(
    eventValue: string,
    inputName: keyof Checker & keyof SignUp,
  ): void {
    this.signUpformData[inputName] = eventValue;
    switch (inputName) {
      case 'name':
      case 'lastName':
      case 'email':
        this.regexFormatChecker(inputName);
        break;
      default:
        this.checkIsFilled(eventValue, inputName);
    }
    this.btDissabler();
  }
  /**
   * receiveCheckboxStateOnChange
   * Recives the event emitted from app-checkbox component and assigns it
   * to signUpformData object.
   * @param eventValue The event data emmited from componente, usually ($event)
   */
  receiveCheckboxStateOnChange(eventValue: boolean): void {
    this.isFilled.checkbox = eventValue;
    this.btDissabler();
  }
  /**
   * signUpDataPackage
   * Submit signUpformData Object due Cadastrar onClick event.
   */
  signUpDataSubmit(): void {
    this.submitUser
      .registerNewUser(this.signUpformData)
      .then(() => console.log('sucesso'))
      .catch(() => console.log('error'))
      .finally(() => console.log('Finaly'));
  }
}
