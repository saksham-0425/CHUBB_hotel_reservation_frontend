import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBookingRequest, BookingResponse } from '../../shared/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private BASE_URL = 'http://localhost:8765/bookings';

  constructor(private http: HttpClient) {}

  createBooking(
    payload: CreateBookingRequest
  ): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(
      this.BASE_URL,
      payload
    );
  }

  getBookingById(id: number): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(
      `${this.BASE_URL}/${id}`
    );
  }

  getMyBookings(): Observable<BookingResponse[]> {
  return this.http.get<BookingResponse[]>(
    `${this.BASE_URL}/my`
  );
}

payForBooking(bookingId: number) {
  return this.http.post(
    `${this.BASE_URL}/${bookingId}/pay`,
    {}  
  );
}

cancelBooking(bookingId: number) {
  return this.http.delete(
    `${this.BASE_URL}/${bookingId}`
  );
}

}
