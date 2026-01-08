import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/user/pages/search/search')
        .then(c => c.SearchComponent)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes')
        .then(r => r.USER_ROUTES)
  },
  {
  path: 'admin',
  loadChildren: () =>
    import('./features/admin/admin.routes')
      .then(r => r.adminRoutes),
  canActivate: [authGuard, roleGuard],
  data: { roles: ['ADMIN'] }
},
  {
  path: 'manager',
  loadChildren: () =>
    import('./features/manager/manager.routes')
      .then(r => r.managerRoutes),
  canActivate: [authGuard, roleGuard],
  data: { roles: ['MANAGER'] }
},
 {
  path: 'receptionist',
  loadChildren: () =>
    import('./features/receptionist/receptionist.routes')
      .then(r => r.RECEPTIONIST_ROUTES),
  canActivate: [authGuard, roleGuard],
  data: { roles: ['RECEPTIONIST'] }
},
  {
    path: '**',
    redirectTo: ''
  }
];
