import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private route: Router,
    private location: Location,
  ) {}

  @Input() width = '';
  @Input() maxWidthHeader = '';
  @Input() containerHeight = '200px';
  @Input() backgroundColor = '#000000';
  @Input() textColor = '#FFFFFF';
  @Input() showCloseButton = false;
  @Input() characterDescriptionWidth = '';
  @Input() characterDescriptionPositon = '';
  @Input() characterName = '';
  @Input() characterDescription = '';

  /**
   * goBack
   *
   * Função que retorna uma página anterior ao que o usuário estava navegando.
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * redirectHome
   *
   * Função que redireciona o usuário para a página home ao clicar no botão fechar.
   */
  redirectHome(): void {
    this.route.navigate(['home']);
  }
}
