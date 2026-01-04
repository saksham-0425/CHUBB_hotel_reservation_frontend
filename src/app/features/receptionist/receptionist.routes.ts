import { Routes } from '@angular/router';

export const RECEPTIONIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/receptionist-dashboard/receptionist-dashboard')
        .then(m => m.ReceptionistDashboardComponent)
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./pages/receptionist-booking/receptionist-booking')
        .then(m => m.ReceptionistBookingComponent)
  },
  {
    path: 'availability',
    loadComponent: () =>
      import('./pages/receptionist-availability/receptionist-availability')
        .then(m => m.ReceptionistAvailabilityComponent)
  },
  // {
  //   path: 'categories',
  //   loadComponent: () =>
  //     import('./pages/manager-category/manager-category')
  //       .then(m => m.ManagerCategoriesComponent)
  // },
  // {
  //   path: 'rooms',
  //   loadComponent: () =>
  //     import('./pages/manager-rooms/manager-rooms')
  //       .then(m => m.ManagerRoomsComponent)
  // },
  //  {
  //   path: 'receptionists',
  //   loadComponent: () =>
  //     import('./pages/manager-create-recep/manager-create-recep')
  //       .then(m => m.ManagerReceptionistComponent)
  // }
];
