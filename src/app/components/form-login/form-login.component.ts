import { Component } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent {
  login: { email: string; password: string } = { email: '', password: '' };
  checkboxValue = false;
  isFormValid = false;

  checkboxChange(checked: boolean) {
    this.checkboxValue = checked;
  }

  emailValueChange(newValue: string) {
    this.login.email = newValue;
    this.updateFormValidity();
  }

  passwordValueChange(newValue: string) {
    this.login.password = newValue;
    this.updateFormValidity();
  }

  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(this.login.email);
  }

  validatePassword() {
    return this.login.password.length >= 8;
  }

  //Verifica se email e senha são válidos e desbloqueia o botão para submit
  updateFormValidity() {
    this.isFormValid = this.validateEmail() && this.validatePassword();
  }

  //Função que irá enviar o objeto de login para o service
  onSubmit() {
    console.log(this.login); //
  }
}
