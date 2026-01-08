import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data?.['roles'];
  const userRole = auth.getRoleFromToken();

  if (allowedRoles && userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/'], {
  queryParams: { unauthorized: true }
});
  return false;
};
