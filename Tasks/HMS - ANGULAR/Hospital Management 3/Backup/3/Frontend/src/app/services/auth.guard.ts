import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated || !user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (route.data['roles'] && route.data['roles'].length > 0) {
      const hasRole = this.authService.hasAnyRole(route.data['roles']);
      if (!hasRole) {
        this.router.navigate(['/403']); 
        return false;
      }
    }

    return true;
  }
}
