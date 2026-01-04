import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingResponse } from '../../../shared/models/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private baseUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}
  getBookingsByHotel(hotelId: number): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(
      `${this.baseUrl}/hotels/${hotelId}/bookings`
    );
  }
}
