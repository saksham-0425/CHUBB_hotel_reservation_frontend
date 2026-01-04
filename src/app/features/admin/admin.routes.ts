import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'hotels',
        loadComponent: () =>
          import('./pages/hotels/hotels')
            .then(m => m.HotelsComponent)
      },
      {
        path: 'hotels/:id',
        loadComponent: () =>
          import('./pages/hotel-details/hotel-details')
            .then(m => m.HotelDetailsComponent)
      },
      {
  path: 'hotels/:id/bookings',
  loadComponent: () =>
    import('./pages/hotel-bookings/hotel-bookings')
      .then(m => m.HotelBookingsComponent)
}
    ]
  }
];
