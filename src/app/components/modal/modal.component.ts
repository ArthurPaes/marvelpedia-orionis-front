import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() width = '360px';
  @Input() height = '321px';
  @Input() message = '';
  @Input() isModalActive = false;
  @Input() icon = 'check_circle_outline';
  @Input() title = 'Sucesso!';
  @Input() buttonLabel = 'FINALIZAR';
  @Input() showCloseButton = true;
  @Input() closeButtonIcon = 'close';
  @Output() emitEventClose = new EventEmitter();

  /**
   * closeModal
   *
   * Emit an event to parent component in order to close the modal.
   */

  closeModal(): void {
    this.emitEventClose.emit(false);
  }
}
