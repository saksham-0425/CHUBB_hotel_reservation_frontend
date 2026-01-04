import { AdminHotel } from '../../../shared/models/admin-hotel';
import { Hotel } from '../../../shared/models/hotel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomCategory } from '../../../shared/models/room-category';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private baseUrl = 'http://localhost:8765/hotels';

  constructor(private http: HttpClient) {}
  getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl);
  }
  getHotelById(id: number): Observable<AdminHotel> {
    return this.http.get<AdminHotel>(`${this.baseUrl}/${id}`);
  }
  createHotel(payload: AdminHotel): Observable<AdminHotel> {
    return this.http.post<AdminHotel>(this.baseUrl, payload);
  }
getCategoriesByHotel(hotelId: number): Observable<RoomCategory[]> {
  return this.http.get<RoomCategory[]>(
    `${this.baseUrl}/${hotelId}/categories`
  );
}
}
