import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    console.log('Auth Interceptor - URL:', req.url, 'Token:', token ? 'EXISTS' : 'MISSING');

    if (req.url.includes('/auth/login') || 
        req.url.includes('/auth/register') || 
        req.url.includes('/auth/validate') ||
        req.url.includes('/auth/health') ||
        req.url.includes('metadata') || 
        req.url.includes('assets/')) {
      console.log('Skipping auth header for:', req.url);
      return next.handle(req);
    }

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Adding Authorization header:', `Bearer ${token.substring(0, 20)}...`);
      return next.handle(clonedReq);
    }

    console.warn('No token available for request:', req.url);
    return next.handle(req);
  }
}
