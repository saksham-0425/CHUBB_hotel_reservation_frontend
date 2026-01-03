import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-rooms/search-rooms')
        .then(c => c.SearchRooms)
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/my-bookings/my-bookings')
        .then(c => c.MyBookings)
  },
   {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register')
        .then(c => c.RegisterComponent)
  },
   {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(c => c.LoginComponent)
  },

];
