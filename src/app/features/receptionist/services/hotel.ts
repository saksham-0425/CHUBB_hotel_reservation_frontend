import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}
  getHotelForReceptionist() {
    return this.http.get<any>(
      `${this.apiUrl}/hotels/internal/receptionist`
    );
  }
  getHotelRooms(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/hotels/${hotelId}/rooms`
    );
  }
  updateRoomStatus(roomId: number, status: string) {
    return this.http.put(
      `${this.apiUrl}/hotels/rooms/${roomId}/status`,
      { status }
    );
  }
}
