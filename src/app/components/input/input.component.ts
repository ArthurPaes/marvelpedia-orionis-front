import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Output() valueChange = new EventEmitter<string>;
  @Input() placeHolder: string = '';
  @Input() inputType: string = '';
  @Input() fieldsetLabel:string = '';
  @Input() iconName = '';
  @Input() inputWidth:string = '';
  @Input() inputBorderColor:string = '#2C85D8';
  
  public value:string = '';
  public showPassword:boolean = false;
  
/**
 * This function allows you send input typed word to parent component.
 * @param inputData Each letter typed in input component
 */

  sendData(inputData:Event):void {
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChange.emit(this.value);
  }
}
