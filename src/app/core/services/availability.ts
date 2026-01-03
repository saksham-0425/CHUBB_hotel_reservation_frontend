import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private BASE_URL = 'http://localhost:8765/hotels';

  constructor(private http: HttpClient) {}

  getAvailability(
    hotelId: number,
    checkIn: string,
    checkOut: string
  ): Observable<any> {

    return this.http.get<any>(
      `${this.BASE_URL}/${hotelId}/availability`,
      {
        params: {
          checkIn,
          checkOut
        }
      }
    );
  }
}
