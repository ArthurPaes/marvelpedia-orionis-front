import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
    
  @Input() label:string = '';  
  @Input() buttonType:string = 'default';
  @Input() isDisabled:boolean = false;
  @Input() custonStyle:string = '';
  
  @Output() btnClick = new EventEmitter();
  
 /**
 * onClick
 * 
 * Função responsável por emitir o evento de click para o componente pai.
 */
 	onClick() {
		this.btnClick.emit();
  }	
}