import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() width:string = '360px';
  @Input() height:string = '321px';
  @Input() message:string = '';
  @Input() isModalActive:boolean = false;
  @Output() emitEventClose = new EventEmitter();

  /**
   * closeModal
   * 
   * Emit an event to parent component in order to close the modal. 
   */

  closeModal():void {
    this.emitEventClose.emit(false);
  }

}
