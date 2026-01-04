import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

  createRoom(hotelId: number, payload: any) {
    return this.http.post(
      `${this.apiUrl}/hotels/${hotelId}/rooms`,
      payload
    );
  }

  bulkCreateRooms(hotelId: number, payload: any) {
    return this.http.post(
      `${this.apiUrl}/hotels/${hotelId}/rooms/bulk`,
      payload
    );
  }

  getRooms(hotelId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/hotels/${hotelId}/rooms`
  );
}
}
