import { Routes } from '@angular/router';

export const managerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/manager-bookings/manager-bookings')
        .then(m => m.ManagerBookingsComponent)
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/manager-category/manager-category')
        .then(m => m.ManagerCategoriesComponent)
  },
  {
    path: 'rooms',
    loadComponent: () =>
      import('./pages/manager-rooms/manager-rooms')
        .then(m => m.ManagerRoomsComponent)
  },
   {
    path: 'receptionists',
    loadComponent: () =>
      import('./pages/manager-create-recep/manager-create-recep')
        .then(m => m.ManagerReceptionistComponent)
  }
];
