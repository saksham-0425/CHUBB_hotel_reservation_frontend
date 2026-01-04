import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/user/pages/home/home')
        .then(c => c.Home)
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
        .then(r => r.adminRoutes)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
