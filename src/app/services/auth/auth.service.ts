import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

(window as any).global = window;

@Injectable()
export class AuthService {

  requestedScopes: string[] = ["openid", "profile"];
  
  auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientID,
    domain: environment.auth0.domain,
    audience: environment.auth0.audience,
    responseType: 'token id_token',
    redirectUri: window.location.origin + environment.auth0.redirectPath,
    scope: this.requestedScopes.join(' ')
  });

  jwt = new JwtHelperService();
  
  constructor(public router: Router) { }

  public login() {
    // Request login page (Universal Lock screen)
    this.auth0.authorize();
  }

  public registerCallback(): void {
    // Register callback to parse hash returned in URL
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
      else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    let accessTokenExpiresAt  = new Date().getTime() + (authResult.expiresIn * 1000);
    let grantedScopes = (authResult.scope) ? authResult.scope.split(' ') : this.requestedScopes;

    // Get user info from ID token
    let idTokenPayload = this.jwt.decodeToken(authResult.idToken);

    // Save 'public' info to local storage
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('name', idTokenPayload.name);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('access_token_expires_at', JSON.stringify(accessTokenExpiresAt));
    localStorage.setItem('granted_scopes', JSON.stringify(grantedScopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('name');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expires_at');
    localStorage.removeItem('granted_scopes');

    // Do we need this?
    // this.auth0.logout({
    //   clientID: environment.auth0.clientID,
    //   returnTo: window.location.origin
    // });
    
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the Access Token's expiry time
    return new Date().getTime() < JSON.parse(localStorage.getItem('access_token_expires_at') || '{}');
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('granted_scopes'));
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}
