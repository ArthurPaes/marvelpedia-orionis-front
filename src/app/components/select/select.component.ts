import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {

  @Output() valueChange = new EventEmitter<string>;
  @Input() selectWidth:string = '100%';
  @Input() selectBorderColor:string = '';
  @Input() optionList:Array<string> = [];

  public valueSelect: string = '';
  
/**
 * This function allows you send select chosen word to parent component.
 * @param selectData value selected in input component
 */

  sendData(event:Event):void {
    this.valueSelect = (event.target as HTMLSelectElement).value
    this.valueChange.emit(this.valueSelect);
  }
}
