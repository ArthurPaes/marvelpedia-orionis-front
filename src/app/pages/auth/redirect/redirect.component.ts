import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApi } from 'src/app/core/api/app/auth.api';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private authApi: AuthApi,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  public message = '';

  /**
   * ngOnInit
   *
   * Função que será disparada ao inicializar o componente fazendo o http request GET que pega o status e mensagem após o usuário clicar no link do e-mail de validação.
   */
  ngOnInit(): void {
    const token: string | null =
      this.activatedRoute.snapshot.queryParamMap.get('token');
    this.authApi.checkValidToken(token).then((tokenValidated) => {
      this.message = tokenValidated.message;
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
