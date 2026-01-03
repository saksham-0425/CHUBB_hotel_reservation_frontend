import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../../shared/models/hotel';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private BASE_URL = 'http://localhost:8765/hotels';

  constructor(private http: HttpClient) {}

  searchByCity(city: string) {
    return this.http.get<Hotel[]>(
      `${this.BASE_URL}/search`,
      { params: { city } }
    );
  }
}
