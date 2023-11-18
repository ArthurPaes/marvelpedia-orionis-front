import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  /**
   * canActivate
   *
   * Verifica se o usuário possui um token de autenticação. Se não houver redireciona o usuário para a página de login.
   *
   * @param route - A snapshot da rota ativada.
   * @param state - O estado do roteador.
   * @returns Um valor booleano informando se o usuário pode ou não acessar a rota.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (!localStorage.getItem('@authToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
