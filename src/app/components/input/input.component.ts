import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeHolder = '';
  @Input() inputType = '';
  @Input() fieldsetLabel = '';
  @Input() iconName = '';
  @Input() inputWidth = '';
  @Input() inputBorderColor = '#2C85D8';

  public value = '';
  public showPassword = false;
  /**
   * This function allows you send input typed word to parent component.
   * @param inputData Each letter typed in input component
   */

  sendData(inputData: Event): void {
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChange.emit(this.value);
  }
}
