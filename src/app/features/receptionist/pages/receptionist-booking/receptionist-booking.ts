import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking';

@Component({
  standalone: true,
  selector: 'app-receptionist-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './receptionist-booking.html'
})
export class ReceptionistBookingComponent {

  reference = '';
  booking: any;

  loading = false;
  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  searchBooking(): void {
    this.loading = true;
    this.errorMessage = '';

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
    this.bookingService.checkIn(this.booking.bookingId).subscribe(() => {
      alert('Guest checked in');
      this.searchBooking();
    });
  }

  checkOut(): void {
    this.bookingService.checkOut(this.booking.bookingId).subscribe(() => {
      alert('Guest checked out');
      this.searchBooking();
    });
  }
}
