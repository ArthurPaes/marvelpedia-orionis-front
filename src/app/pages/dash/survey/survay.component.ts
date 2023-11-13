import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survay',
  templateUrl: './survay.component.html',
  styleUrls: ['./survay.component.scss'],
})
export class SurvayComponent {
  constructor(private router: Router) {}

  /**
   * redirectHome
   *
   * Função que redireciona para a página home
   */
  redirectHome(): void {
    this.router.navigate(['login']);
  }
}
