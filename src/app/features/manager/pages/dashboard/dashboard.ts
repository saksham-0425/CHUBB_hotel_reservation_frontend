import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

import { ReportService } from '../../../../core/services/report';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  hotelId!: number;
  year = new Date().getFullYear();
  loading = true;

  avgRevenue = 0;

  bookingStatusChart?: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    title: ApexTitleSubtitle;
  };

  monthlyBookingsChart?: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

  constructor(
    private router: Router,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedHotelId = localStorage.getItem('managerHotelId');

    if (!storedHotelId) {
      this.router.navigate(['/login']);
      return;
    }

    this.hotelId = Number(storedHotelId);
    this.loadDashboard();
  }

loadDashboard(): void {
  this.loading = true;

  let completed = 0;
  const total = 3;

  const done = () => {
    completed++;
    if (completed === total) {
      this.loading = false;
      this.cdr.detectChanges();
    }
  };

  // Avg Revenue (unchanged)
  this.reportService.getAverageRevenue(this.hotelId)
    .subscribe(res => {
      this.avgRevenue = res.averageRevenue ?? 0;
      done();
    });

  // 👇 CURRENT MONTH RANGE
  const { from, to } = this.getCurrentMonthRange();

  // Booking Status Distribution (CURRENT MONTH)
  this.reportService.getOccupancy(this.hotelId, from, to)
    .subscribe(data => {
      if (data && data.length > 0) {
        this.bookingStatusChart = {
          series: data.map(d => d.count),
          chart: { type: 'donut' },
          labels: data.map(d => d.status.replace('_', ' ')),
          title: { text: 'Booking Status Distribution (This Month)' }
        };
      }
      done();
    });

  // Monthly booking volume (still yearly – this is correct)
  this.reportService.getMonthlyOccupancy(this.hotelId, this.year)
    .subscribe(data => {
      if (data && data.length > 0) {
        this.monthlyBookingsChart = {
          series: [{
            name: 'Bookings',
            data: data.map(d => d.occupiedBookings ?? 0)
          }],
          chart: { type: 'line' },
          xaxis: { categories: data.map(d => d.month) },
          title: { text: `Monthly Booking Volume (${this.year})` }
        };
      }
      done();
    });
}


  goToBookings(): void {
    this.router.navigate(['/manager/bookings']);
  }

  goToCategories(): void {
    this.router.navigate(['/manager/categories']);
  }

  goToRooms(): void {
    this.router.navigate(['/manager/rooms']);
  }

  goToReceptionists(): void {
    this.router.navigate(['/manager/receptionists']);
  }

  private getCurrentMonthRange(): { from: string; to: string } {
  const now = new Date();

  // First day of current month
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  // Last day of current month
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const from = firstDay.toISOString().split('T')[0];
  const to = lastDay.toISOString().split('T')[0];

  return { from, to };
}

}
