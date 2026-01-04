import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

 getHotelForManager() {
  return this.http.get<any>(
    'http://localhost:8765/hotels/internal/manager'
  );
}
}
