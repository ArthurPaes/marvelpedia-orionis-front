import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent {
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
