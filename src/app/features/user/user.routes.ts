import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { roleGuard } from '../../core/guards/role-guard';

import { BookingDetailsComponent } from './pages/booking-details/booking-details';



export const USER_ROUTES: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search')
        .then(c => c.SearchComponent)
  },
  {
  path: 'bookings/create',
  loadComponent: () =>
    import('./pages/create-booking/create-booking')
      .then(c => c.CreateBookingComponent),
  canActivate: [authGuard, roleGuard],
  data: { roles: ['GUEST'] }
},
{
  path: 'bookings/:id',
  loadComponent: () =>
    import('./pages/booking-details/booking-details')
      .then(c => c.BookingDetailsComponent),
  canActivate: [authGuard]
},
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/my-bookings/my-bookings')
        .then(c => c.MyBookingsComponent)
  },
{
  path: 'user/bookings/:id',
  component: BookingDetailsComponent
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
  {
  path: 'hotels/:hotelId/availability',
  loadComponent: () =>
    import('./pages/hotel-availability/hotel-availability')
      .then(c => c.HotelAvailabilityComponent)
}

];
