import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from './manager';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private apiUrl = 'http://localhost:8765';

  constructor(private http: HttpClient) {}

  getCategories() {
    const hotelId = localStorage.getItem('managerHotelId');

    return this.http.get<any[]>(
      `${this.apiUrl}/hotels/${hotelId}/categories`
    );
  }

  updateCategory(categoryId: number, payload: any) {
    return this.http.put(
      `${this.apiUrl}/hotels/categories/${categoryId}`,
      payload
    );
  }
}
