import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Output() valueChange = new EventEmitter<string>();
  @Output() valueChangeLogin = new EventEmitter<string>();
  @Input() placeHolder = '';
  @Input() inputType = '';
  @Input() fieldsetLabel = '';
  @Input() inputWidth = '';
  @Input() inputBorderColor = '#FFFFFF';
  @Input() color = '';
  @Input() backgroundColorTag = '';
  @Input() cleanValue = '';
  @Input() inputSearchClass = 'inputSearchDetails';
  @Input() height = '';

  public value = '';
  public showPassword = false;
  public showTagLabel = false;
  public showCloseBtn = false;
  public showIconDate = false;

  /**
   * cleanInputValue
   *
   * Função que limpa o input ao clicar em um botão limpar do componente pai.
   */
  cleanInputValue(): void {
    this.value = '';
    this.showTagLabel = false;
    this.inputBorderColor = '#FFFFFF';
  }

  /**
   * cleanInputSearch
   *
   * Função que limpa o input tipo search ao clicar no icone de 'x'.
   */
  cleanInputSearch(): void {
    this.value = '';
    if (this.color == '#FFFFFF') {
      this.inputBorderColor = '#FFFFFF';
    } else {
      this.inputBorderColor = '#000000';
    }
    this.showTagLabel = false;
    this.showCloseBtn = false;
  }

  /**
   * changeInputFocus
   *
   * Função que faz aparecer o icone do calendário no input tipo date
   */
  changeInputFocus(): void {
    this.showIconDate = true;
    this.inputWidth = '100%';
  }

  /**
   * sendData
   *
   * This function allows you send input typed word to parent component.
   *
   * @param inputData Each letter typed in input component
   */
  sendData(inputData: Event): void {
    this.showTagLabel = false;
    this.showCloseBtn = false;
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChange.emit(this.value);
    if (this.value.length > 0) {
      this.showTagLabel = true;
      this.showCloseBtn = true;
    }
  }

  /**
   * sendDataLogin
   *
   * This function allows you send input typed word to parent component Login.
   *
   * @param inputData Each letter typed in input component
   */
  sendDataLogin(inputData: Event): void {
    if (this.color == '#FFFFFF') {
      this.inputBorderColor = '#FFFFFF';
    } else {
      this.inputBorderColor = '#000000';
    }
    this.showTagLabel = false;
    this.showCloseBtn = false;
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChangeLogin.emit(this.value);
    if (this.value.length > 0) {
      this.inputBorderColor = '#2C85D8';
      this.backgroundColorTag = '#2C85D8';
      this.showTagLabel = true;
      this.showCloseBtn = true;
    }
  }
}
