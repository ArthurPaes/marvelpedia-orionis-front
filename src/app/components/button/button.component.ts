import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label = '';
  @Input() buttonType = 'default';
  @Input() isDisabled = false;
  @Input() custonStyle = '';

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
