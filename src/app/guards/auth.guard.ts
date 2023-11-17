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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (!localStorage.getItem('@authToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
