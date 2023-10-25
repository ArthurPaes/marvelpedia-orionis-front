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
