import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const isApiRequest = req.url.startsWith(environment.apiBaseUrl);
  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/auth/validate');

  if (!isApiRequest || isAuthRequest || !token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
