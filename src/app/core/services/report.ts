import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminMonthlyRevenue } from '../../shared/models/report';
import { MonthlyRevenue } from '../../shared/models/report';
import { OccupancyReport } from '../../shared/models/report';
import { AvgRevenue } from '../../shared/models/report';

@Injectable({ providedIn: 'root' })
export class ReportService {

  private baseUrl = 'http://localhost:8765/reports';

  constructor(private http: HttpClient) {}

  // ADMIN
  getAdminMonthlyRevenue(year: number) {
    return this.http.get<AdminMonthlyRevenue[]>(
      `${this.baseUrl}/revenue/monthly/all-hotels`,
      { params: { year } }
    );
  }

  // ADMIN + MANAGER
  getMonthlyRevenue(hotelId: number, year: number) {
    return this.http.get<MonthlyRevenue[]>(
      `${this.baseUrl}/revenue/monthly`,
      { params: { hotelId, year } }
    );
  }

  getOccupancy(hotelId: number, from: string, to: string) {
    return this.http.get<OccupancyReport[]>(
      `${this.baseUrl}/occupancy`,
      { params: { hotelId, from, to } }
    );
  }

   getMonthlyOccupancy(hotelId: number, year: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/occupancy/monthly?hotelId=${hotelId}&year=${year}`
    );
  }

  getAverageRevenue(hotelId: number) {
    return this.http.get<AvgRevenue>(
      `${this.baseUrl}/revenue/average`,
      { params: { hotelId } }
    );
  }
}
