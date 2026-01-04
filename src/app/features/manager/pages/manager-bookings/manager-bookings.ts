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
    const confirmed = confirm('Confirm this booking?');
    if (!confirmed) return;

    this.bookingService.confirmBooking(bookingId).subscribe({
      next: () => {
        alert('Booking confirmed');
        this.fetchBookings(); 
      },
      error: () => {
        alert('Failed to confirm booking');
      }
    });
  }
}
