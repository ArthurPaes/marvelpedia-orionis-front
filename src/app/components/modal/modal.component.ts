import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() width:string = '360px';
  @Input() height:string = '321px';
  @Input() mensagem:string = '';
  @Input() isModalActive:boolean = false;
  @Output() emitEventClose = new EventEmitter();

  closeModal() {
    this.emitEventClose.emit(false);
  }

}
