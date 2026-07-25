import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  
  const token = storageService.getToken();
  
  if (token) {
    return true;
  }
  
  router.navigate(['/auth/login']);
  return false;
};
