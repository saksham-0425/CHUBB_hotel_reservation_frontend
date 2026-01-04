import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

import { ReportService } from '../../../../core/services/report';
import { HotelService } from '../../../../core/services/hotel';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  loading = true;

  hotels: any[] = [];
  selectedHotelId!: number;

  year = new Date().getFullYear();
  fromDate!: string;
  toDate!: string;

  revenueByHotelChart!: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
  };

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

  avgRevenue!: number;

  constructor(
    private reportService: ReportService,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeDates();
    this.loadHotels();
    this.loadRevenueByHotel(); 
  }

  initializeDates(): void {
    this.fromDate = `${this.year}-01-01`;
    this.toDate = new Date().toISOString().split('T')[0];
  }

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe(hotels => {
      this.hotels = hotels;

      if (hotels.length) {
        this.selectedHotelId = hotels[0].id;
        this.loadHotelLevelReports();
      }

      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onHotelChange(): void {
    this.loadHotelLevelReports();
  }

  loadHotelLevelReports(): void {
    this.loadBookingStatus();
    this.loadMonthlyBookings();
    this.loadAvgRevenue();
  }

  loadRevenueByHotel(): void {
    this.reportService.getAdminMonthlyRevenue(this.year)
      .subscribe(data => {

        const revenueMap = new Map<number, number>();

        data.forEach(d => {
          revenueMap.set(
            d.hotelId,
            (revenueMap.get(d.hotelId) || 0) + d.revenue
          );
        });

        this.revenueByHotelChart = {
          series: [{
            name: 'Revenue',
            data: Array.from(revenueMap.values())
          }],
          chart: { type: 'bar', height: 350 },
          xaxis: {
            categories: Array.from(revenueMap.keys()).map(id => `Hotel ${id}`)
          },
          title: {
            text: `Total Revenue by Hotel (${this.year})`
          }
        };

        this.cdr.detectChanges();
      });
  }

  loadBookingStatus(): void {
    this.reportService.getOccupancy(
      this.selectedHotelId,
      this.fromDate,
      this.toDate
    ).subscribe(data => {

      this.bookingStatusChart = {
        series: data.map(d => d.count),
        chart: { type: 'donut', height: 300 },
        labels: data.map(d => d.status),
        title: {
          text: 'Booking Status Distribution'
        }
      };

      this.cdr.detectChanges();
    });
  }

  loadMonthlyBookings(): void {
    this.reportService.getMonthlyOccupancy(
      this.selectedHotelId,
      this.year
    ).subscribe(data => {

      this.monthlyBookingsChart = {
        series: [{
          name: 'Bookings',
          data: data.map(d => d.occupiedBookings)
        }],
        chart: { type: 'line', height: 300 },
        xaxis: {
          categories: data.map(d => d.month)
        },
        title: {
          text: `Monthly Booking Volume (${this.year})`
        }
      };

      this.cdr.detectChanges();
    });
  }

  loadAvgRevenue(): void {
    this.reportService.getAverageRevenue(this.selectedHotelId)
      .subscribe(res => {
        this.avgRevenue = res.averageRevenue;
        this.cdr.detectChanges();
      });
  }

  goToHotels(): void {
    this.router.navigate(['/admin/hotels']);
  }
}
