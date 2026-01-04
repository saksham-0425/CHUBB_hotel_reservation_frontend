import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

  updateRoomStatus(roomId: number, status: string) {
    return this.http.put(
      `${this.apiUrl}/hotels/rooms/${roomId}/status`,
      { status }
    );
  }
}
