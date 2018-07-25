import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request, next) {
    // Clone the request and add the access token
    let requestWithToken = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return next.handle(requestWithToken);
  }
}
