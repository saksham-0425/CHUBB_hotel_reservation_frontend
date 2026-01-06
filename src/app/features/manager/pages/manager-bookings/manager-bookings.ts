import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';
import { BookingResponse } from '../../../../shared/models/booking';

@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-bookings.html',
  styleUrls: ['./manager-bookings.css']
})
export class ManagerBookingsComponent implements OnInit {

  bookings: BookingResponse[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';
  confirmingId: number | null = null;

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.getHotelBookings().subscribe({
      next: (data) => {
        this.bookings = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load hotel bookings';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmBooking(bookingId: number): void {
    this.confirmingId = bookingId;
    this.successMessage = '';
    this.errorMessage = '';

    this.bookingService.confirmBooking(bookingId).subscribe({
      next: () => {
        this.successMessage = 'Booking confirmed successfully';
        this.confirmingId = null;
        this.fetchBookings();
      },
      error: () => {
        this.errorMessage = 'Failed to confirm booking';
        this.confirmingId = null;
        this.cdr.detectChanges();
      }
    });
  }
}
