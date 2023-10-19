import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  
  public inputValue:string = '';
  @Output() public inputModificado = new EventEmitter<string>;
  @Input() public placeHolder: string = '';

  // ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  // }

  public enviarValorDigitado() {
    this.inputModificado.emit(this.inputValue)
  }
}
