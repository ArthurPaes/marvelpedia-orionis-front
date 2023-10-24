import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-genero',
  templateUrl: './select-genero.component.html',
  styleUrls: ['./select-genero.component.scss']
})

export class SelectGeneroComponent {

  @Output() valueChange = new EventEmitter<string>;
  @Input() selectWidth:string = '100%';
  @Input() selectBorderColor:string = '';
  
  public optionList:Array<string> = [ 
    'mulher (cis ou trans)', 
    'homem (cis ou trans)', 
    'não binário',  
    'prefiro não dizer'
  ]

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
