import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpConf } from '../http/http.conf';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    } else if (!req.url.includes(HttpConf.URL.auth)) { 
      if (req.url.includes(HttpConf.URL.registration)) { 
        return next.handle(req);
      }
      return NEVER;
    }
    return next.handle(req);
  }
}
