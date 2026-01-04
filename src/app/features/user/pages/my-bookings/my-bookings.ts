import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../../../core/services/booking';
import { BookingResponse } from '../../../../shared/models/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookingsComponent implements OnInit {

  bookings: BookingResponse[] = [];
  loading = true;
  errorMessage = '';

  paidBookings = new Set<number>();

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPaidBookings();
    this.fetchBookings();
  }

  loadPaidBookings(): void {
    const stored = localStorage.getItem('paidBookings');
    if (stored) {
      this.paidBookings = new Set<number>(
        JSON.parse(stored)
      );
    }
  }

  savePaidBookings(): void {
    localStorage.setItem(
      'paidBookings',
      JSON.stringify(Array.from(this.paidBookings))
    );
  }

  fetchBookings(): void {
    this.loading = true;
    this.errorMessage = '';

    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load bookings';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewBooking(bookingId: number): void {
    this.router.navigate(['/user/bookings', bookingId]);
  }

  payBooking(bookingId: number): void {
    const confirmed = confirm('Do you want to proceed with payment?');
    if (!confirmed) return;

    this.bookingService.payForBooking(bookingId).subscribe({
      next: () => {
        alert('Payment successful');

    
        this.paidBookings.add(bookingId);
        this.savePaidBookings();

        this.cdr.detectChanges();
      },
      error: () => {
        alert('Payment failed');
      }
    });
  }


  isPaid(bookingId: number): boolean {
    return this.paidBookings.has(bookingId);
  }
}
