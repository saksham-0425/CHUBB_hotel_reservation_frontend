export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface AdminMonthlyRevenue {
  hotelId: number;
  month: string;
  revenue: number;
}

export interface OccupancyReport {
  status: string;
  count: number;
}

export interface AvgRevenue {
  hotelId: number;
  averageRevenue: number;
}
