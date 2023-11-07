import { Component, OnInit } from '@angular/core';
import { redirectApi } from '../../../core/api/app/redirect.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private httpRedirect: redirectApi,
    private router: Router,
  ) {}

  public message = '';

  /**
   * ngOnInit
   *
   * Função http request GET que pega o status e mensagem após o usuário clicar no link do e-mail de validação.
   */
  ngOnInit(): void {
    this.httpRedirect.redirectRequest().then((dt) => {
      this.message = dt.message;
    });
  }

  /**
   * redirectLogin
   *
   * Função que redireciona o usuário para a tela de login.
   */
  redirectLogin(): void {
    this.router.navigate(['login']);
  }
}
