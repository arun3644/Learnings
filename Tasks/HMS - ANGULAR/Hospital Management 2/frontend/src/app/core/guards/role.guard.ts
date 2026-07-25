import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  
  const userRole = storageService.getUserRole();
  const allowedRoles = route.data['roles'] as string[];
  
  if (allowedRoles && allowedRoles.includes(userRole)) {
    return true;
  }
  
  router.navigate(['/unauthorized']);
  return false;
};
