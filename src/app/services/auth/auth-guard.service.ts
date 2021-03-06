import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const allowedScope: string = route.data.scope || '';
    if (this.authService.userHasScopes(allowedScope.split(" "))) {
      return true;
    }

    this.router.navigate(['403']);
    return false;
  }

}
