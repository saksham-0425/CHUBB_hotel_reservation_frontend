import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';

@Component({
  standalone: true,
  selector: 'app-receptionist-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './receptionist-booking.html',
  styleUrls: ['./receptionist-booking.css']
})
export class ReceptionistBookingComponent {

  reference = '';
  booking: any;

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  searchBooking(): void {
    if (!this.reference) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.booking = null;

    this.bookingService.getBookingByReference(this.reference).subscribe({
      next: data => {
        this.booking = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Booking not found';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  checkIn(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.checkIn(this.booking.bookingId).subscribe({
      next: () => {
        this.successMessage = 'Guest checked in successfully';
        this.loading = false;
        this.searchBooking();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to check in guest';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  checkOut(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.checkOut(this.booking.bookingId).subscribe({
      next: () => {
        this.successMessage = 'Guest checked out successfully';
        this.loading = false;
        this.searchBooking();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to check out guest';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
