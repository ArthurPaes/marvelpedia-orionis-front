import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
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
   * closeModal
   *
   * Emit an event to parent component in order to close the modal.
   */
  closeModal(): void {
    this.emitEventClose.emit(false);
  }
}
