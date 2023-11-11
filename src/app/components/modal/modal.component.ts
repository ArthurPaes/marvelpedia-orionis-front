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
  @Input() message = '';
  @Input() isModalActive = false;
  @Input() isError = false;
  @Output() emitEventClose = new EventEmitter();

  iconName = '';
  modalLabel = 'Label';
  btLabel = '';
  btRoute = '';

  modalSwitch = (): void => {
    this.isError
      ? ((this.iconName = 'cancel_circle_outline'),
        (this.modalLabel = 'Error!'),
        (this.btRoute = 'http://localhost:4200/login'))
      : ((this.iconName = 'check_circle_outline'),
        (this.modalLabel = 'Sucesso!'),
        (this.btRoute = 'http://localhost:4200/home'));
  };

  ngOnChanges() {
    this.modalSwitch();
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
