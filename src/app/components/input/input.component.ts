import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

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
  
  value:string = '';
  showPassword:boolean = false;
  
  sendData(inputData:Event) {
    this.value = (inputData.target as HTMLInputElement).value.trim();
    this.valueChange.emit(this.value);
  }
}
