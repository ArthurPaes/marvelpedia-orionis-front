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

  @Input() width = '1205px';
  @Input() containerHeight = '153px';
  @Input() backgroundColor = '#000000';
  @Input() textColor = '#FFFFFF';
  @Input() showCloseButton = false;
  @Input() characterDescriptionWidth = '';
  @Input() characterDescriptionPositon = '';
  @Input() characterName = '';
  @Input() characterDescription = '';

  /**
   * backRoute
   *
   * Função que retorna uma página anterior ao que o usuário estava navegando.
   */
  backRoute(): void {
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
