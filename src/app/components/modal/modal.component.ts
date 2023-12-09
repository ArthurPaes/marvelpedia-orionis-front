import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(private renderer: Renderer2) {}
  @Input() width = '360px';
  @Input() height = '321px';
  @Input() iconName = 'check_circle_outline';
  @Input() title = '';
  @Input() message = '';
  @Input() btText = '';
  @Input() isModalActive = false;
  @Input() closeOnOverlayClick = true;
  @Output() emitEventClose = new EventEmitter();

  /**
   * ngOnChanges
   *
   * Detecta alterações em 'isModalActive'. Se a variável for verdadeira, aplica 'overflow: hidden' e desativa a barra de rolagem no body da aplicação. Caso contrário, remove a propriedade 'overflow' para restaurar a rolagem.
   */
  ngOnChanges(): void {
    if (this.isModalActive) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  /**
   * closeModal
   *
   * Emit an event to parent component in order to close the modal.
   */
  closeModal(): void {
    this.emitEventClose.emit(false);
  }
}
