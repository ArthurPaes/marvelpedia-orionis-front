import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent {
  constructor(private renderer: Renderer2) {}
  @Input() iconName = 'check_circle_outline';
  @Input() title = '';
  @Input() message = '';
  @Input() btText = '';
  @Input() isModalActive = false;
  @Input() closeOnOverlayClick = true;
  @Output() emitEventClose = new EventEmitter();
  @Output() buttonClickProceed = new EventEmitter();

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
   * onClick
   *
   * Função responsável por emitir o evento de click para o componente pai.
   */
  onClickProceed() {
    this.buttonClickProceed.emit();
  }

  /**
   * closeModal
   *
   * Emit an event to parent component in order to close the modal.
   */
  closeModal(): void {
    console.log('passou aqui');
    this.emitEventClose.emit(false);
  }
}
