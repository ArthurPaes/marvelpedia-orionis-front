import { Component } from '@angular/core';
import { Checker, SignUp } from './interfaces/sign-up.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {

  optionList:string[] = [
    'Mulher (cis ou trans)',
    'Homem (cis ou trans)',
    'Não Binário',
    'Prefiro não dizer'
  ];
  optionItem = this.optionList;

  getName: string = '';
  getGender: string = '';
  getBirthDate: string = '';
  getEmail: string = '';
  getPassword: string = '';
  getPasswordConfirm: string = '';
  getCheckboxState: boolean = false;

  signUpformData:SignUp = <SignUp> {};

  isFilled:Checker = <Checker> {
    name : false,
    gender : false,
    birthDate : false,
    email : false,
    emailMatch : false,
    password : false,
    passwordConf : false,
    passwordMatch: false,
    checkbox : false
  };
  emailFormater:string = '';
  emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm);
  passwordMatch:string = '';
  btRegisterState:boolean = false;
  /**
  * btRegisterState toggles the Register button between anabled/disabled states.
  */
  btDissabler = ():void => {
    this.btRegisterState = Object.values(this.isFilled).reduce((a, c) => a && c);
  }
  /**
  * checkIsFilled assigns the current filling state of a input.
  * @param eventValue: The value of a received event.
  * @param prop: A property of isFilled.
  */
  checkIsFilled = (eventValue: string, prop:keyof Checker): void => {
    eventValue.length !== 0 ? this.isFilled[prop] = true : this.isFilled[prop] = false;
  }
  /**
  * emaildFormatChecker checks e-mail input value for emailRegex variable format.
  * @param emailData: input data value. 
  */
  emaildFormatChecker = (emailData: string): void => {
    if(this.emailRegex.test(emailData)) {
      this.isFilled.emailMatch = true;
      this.emailFormater = '#2C85D8';
    } else {
      this.isFilled.emailMatch = false;
      this.emailFormater = 'red';
    }
  }
  /**
  * passwordMatchChecker checks password input and password confirm for match.
  */
  passwordMatchChecker = (): void => {
    if(this.getPassword == this.getPasswordConfirm) {
      this.isFilled.passwordMatch = true;
      this.passwordMatch ='#2C85D8'
    } else { 
      this.isFilled.passwordMatch = false;
      this.passwordMatch ='red'
    };
  }
  /**
  * receiveName recives the event emitted from app-input component "nome"
  * and assign the data to getName variable.
  */  
  receiveNameOnChange($event: string): void {
    this.getName = $event;
    this.checkIsFilled($event, 'name');
    this.btDissabler();     
  }
  /**
  * receiveGenre recives the event emitted from app-select component "genero"
  * and assign the data to getGenre variable.
  */  
  receiveGenreOnChange($event: string): void {
    this.getGender = $event;
    this.checkIsFilled($event, 'gender');
    this.btDissabler();     
  }
  /**
  * receiveBirthDate recives the event emitted from app-input component "data de nascimento"
  * and assign the data to getBirthDate variable.
  */  
  receiveBirthDateOnChange($event: string): void {
    this.getBirthDate = $event;
    this.checkIsFilled($event, 'birthDate');
    this.btDissabler(); 
  }
  /**
  * receiveEmail recives the event emitted from app-input component "e-mail"
  * and assign the data to getEmail variable.
  */  
  receiveEmailOnChange($event: string): void {
    this.getEmail = $event;
    this.emaildFormatChecker($event);
    this.checkIsFilled($event, 'email');
    this.btDissabler(); 
  }
  /**
  * receivePassword recives the event emitted from app-input component "senha"
  * and assign the data to getPassword variable.
  */  
  receivePasswordOnChange($event: string):void {
    this.getPassword = $event;
    this.checkIsFilled($event, 'password');  
    this.passwordMatchChecker(); 
    this.btDissabler();
  }
  /**
  * receivePasswordConfirmed recives the event emitted from app-input component "Confirme Sua Senha"
  * and assign the data to getPasswordConfirmed variable.
  */
  receivePasswordConfirmOnChange($event: string): void {
    this.getPasswordConfirm = $event;
    this.checkIsFilled($event, 'passwordConf');  
    this.passwordMatchChecker();
    this.btDissabler();
  }
  /**
  * receivePasswordConfirmed recives the event emitted from app-checkbox component
  * and assign the data to getCheckboxState variable.
  */
  receiveCheckboxStateOnChange($event: boolean):void {
    this.getCheckboxState = $event;
    this.isFilled.checkbox = $event;      
    this.btDissabler(); 
  }
  /**
  * signUpDataPackage assigns the form data to signUpformData Object.
  */
  signUpDataPackage(): object {
    this.signUpformData.name = this.getName;
    this.signUpformData.gender = this.getGender.toString().slice(3);
    this.signUpformData.birthDate = this.getBirthDate;
    this.signUpformData.email = this.getEmail;
    this.signUpformData.password = this.getPassword;

    return this.signUpformData;
  }
}