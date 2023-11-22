import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]',
})
export class NextDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  /**
   * nextCarouselCard
   *
   * Move the first card to the last position.
   */
  nextCarouselCard = (): void => {
    const cardList =
      this.elementRef.nativeElement.parentElement.parentElement.children[0];
    const card = cardList.getElementsByClassName('item-card');
    cardList.append(card[0]);
  };
}
