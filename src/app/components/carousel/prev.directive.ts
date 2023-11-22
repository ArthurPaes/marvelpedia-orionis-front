import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]',
})
export class PrevDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  /**
   * prevCarouselCard
   *
   * Move the last card to the first position.
   */
  prevCarouselCard = (): void => {
    const cardList =
      this.elementRef.nativeElement.parentElement.parentElement.children[0];
    const card = cardList.getElementsByClassName('item-card');
    cardList.prepend(card[card.length - 1]);
  };
}
