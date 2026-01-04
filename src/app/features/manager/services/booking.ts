import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BookingResponse } from '../../../shared/models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private apiUrl = 'http://localhost:8765';
  
  constructor(private http: HttpClient) {}
  getHotelBookings() {
  return this.http.get<BookingResponse[]>(
    `${this.apiUrl}/bookings/manager`
  );
  }

confirmBooking(bookingId: number) {
  return this.http.put<BookingResponse>(
    `${this.apiUrl}/bookings/${bookingId}/confirm`,
    {}
  );
}

}
