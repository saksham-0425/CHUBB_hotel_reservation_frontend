import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data?.['role'];
  const userRole = auth.getRoleFromToken();

  if (userRole === requiredRole) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
