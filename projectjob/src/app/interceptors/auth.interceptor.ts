import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('username');
    if (username) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Basic ${btoa(username + ':' + localStorage.getItem('password'))}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
