import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getAccessToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      });
    }
    return next.handle(req);
  }
}
