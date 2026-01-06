import { Routes } from '@angular/router';

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
        .then(r => r.adminRoutes)
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./features/manager/manager.routes')
        .then(r => r.managerRoutes)
  },
  {
    path: 'receptionist',
    loadChildren: () =>
      import('./features/receptionist/receptionist.routes')
        .then(r => r.RECEPTIONIST_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
