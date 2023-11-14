import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeHolder = '';
  @Input() inputType = '';
  @Input() fieldsetLabel = '';
  @Input() inputWidth = '';
  @Input() inputBorderColor = '#FFFFFF';
  @Input() backgroundColorTag = '';
  @Input() cleanValue = '';

  public value = '';
  public showPassword = false;
  public showTagLabel = false;
  public showCloseBtn = false;
  public showIconDate = false;

  /**
   * ngOnChanges
   *
   * Função que limpa o input ao clicar em um botão limpar do componente pai.
   */
  ngOnChanges(): void {
    if (this.cleanValue.includes('true')) {
      this.value = '';
      this.showTagLabel = false;
      this.inputBorderColor = '#FFFFFF';
    }
  }

  /**
   * cleanInputSearch
   *
   * Função que limpa o input tipo search ao clicar no icone de 'x'.
   */
  cleanInputSearch(): void {
    this.value = '';
    this.inputBorderColor = '#FFFFFF';
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
    this.inputBorderColor = '#FFFFFF';
    this.showTagLabel = false;
    this.showCloseBtn = false;
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChange.emit(this.value);
    if (this.value.length > 0) {
      this.inputBorderColor = '#2C85D8';
      this.showTagLabel = true;
      this.showCloseBtn = true;
    }
  }
}
