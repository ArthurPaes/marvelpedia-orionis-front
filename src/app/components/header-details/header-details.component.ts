import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.scss'],
})
export class HeaderDetailsComponent {
  constructor(private location: Location) {}

  @Input() ContentName = '';
  @Input() ContentDescription = '';
  @Input() ContentThumb = '';

  /**
   * goBack
   *
   * Função que retorna uma página anterior ao que o usuário estava navegando.
   */
  goBack(): void {
    this.location.back();
  }
}
