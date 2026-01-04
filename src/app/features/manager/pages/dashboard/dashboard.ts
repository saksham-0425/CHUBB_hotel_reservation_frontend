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

  avgRevenue!: number;

  bookingStatusChart!: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    title: ApexTitleSubtitle;
  };

  monthlyBookingsChart!: {
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
    console.error('Manager hotelId not found');
    this.router.navigate(['/login']);
    return;
  }

  this.hotelId = Number(storedHotelId);
  this.loadDashboard();
}

  loadDashboard(): void {
    this.loadAvgRevenue();
    this.loadBookingStatus();
    this.loadMonthlyBookings();
    this.loading = false;
  }

  
  loadAvgRevenue(): void {
    this.reportService.getAverageRevenue(this.hotelId)
      .subscribe(res => {
        this.avgRevenue = res.averageRevenue;
        this.cdr.detectChanges();
      });
  }

 
  loadBookingStatus(): void {
    const from = `${this.year}-01-01`;
    const to = new Date().toISOString().split('T')[0];

    this.reportService.getOccupancy(this.hotelId, from, to)
      .subscribe(data => {

        this.bookingStatusChart = {
          series: data.map(d => d.count),
          chart: { type: 'donut', height: 300 },
          labels: data.map(d => d.status),
          title: { text: 'Booking Status Distribution' }
        };

        this.cdr.detectChanges();
      });
  }


  loadMonthlyBookings(): void {
    this.reportService.getMonthlyOccupancy(this.hotelId, this.year)
      .subscribe(data => {

        this.monthlyBookingsChart = {
          series: [{
            name: 'Bookings',
            data: data.map(d => d.occupiedBookings)
          }],
          chart: { type: 'line', height: 300 },
          xaxis: { categories: data.map(d => d.month) },
          title: { text: `Monthly Booking Volume (${this.year})` }
        };

        this.cdr.detectChanges();
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
}
