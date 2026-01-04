import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ManagerService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

  getManagerHotel() {
    return this.http.get<any>(
      `${this.apiUrl}/hotels/internal/manager`
    );
  }

  createReceptionist(payload: any) {
    return this.http.post(
      `${this.apiUrl}/auth/internal/receptionists`,
      payload
    );
  }

  assignReceptionist(hotelId: number, payload: any) {
    return this.http.post(
      `${this.apiUrl}/hotels/${hotelId}/receptionists`,
      payload
    );
  }
}
