import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

  getBookingByReference(reference: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/bookings/reference/${reference}`
    );
  }
  checkIn(bookingId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/bookings/${bookingId}/check-in`,
      {}
    );
  }
  checkOut(bookingId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/bookings/${bookingId}/check-out`,
      {}
    );
  }

  getBookingHistoryByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/bookings/history`,
      { params: { email } }
    );
  }
}
