import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IResponseStandardCategory } from 'src/app/core/api/interfaces/ICharacterCategoryList';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() cardsList: IResponseStandardCategory[] = [];
  @Output() getCardId = new EventEmitter();
  /**
   * onClick
   * Send the card content ID on click event.
   * @param event Event data.
   */
  onClick(event: string): void {
    this.getCardId.emit(event);
  }
}
