import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../../core/services/booking';
import { BookingResponse } from '../../../../shared/models/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css']
})
export class BookingDetailsComponent implements OnInit {

  booking!: BookingResponse;
  loading = true;

  errorMessage = '';
  successMessage = '';
  paymentDone = false;

  // 🔴 modal state
  showCancelModal = false;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBooking();
  }

  fetchBooking(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.getBookingById(id).subscribe({
      next: (res) => {
        this.booking = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Unable to fetch booking';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  payBooking(): void {
    this.bookingService.payForBooking(this.booking.bookingId).subscribe({
      next: () => {
        this.paymentDone = true;
        this.successMessage = 'Payment completed successfully';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Payment failed';
        this.cdr.detectChanges();
      }
    });
  }

  /* ================= CANCEL LOGIC ================= */

  canCancel(): boolean {
    return !(
      this.booking.status === 'CHECKED_IN' ||
      this.booking.status === 'CHECKED_OUT' ||
      this.booking.status === 'CANCELLED'
    );
  }

  openCancelModal(): void {
    if (!this.canCancel()) return;
    this.showCancelModal = true;
  }

  closeCancelModal(): void {
    this.showCancelModal = false;
  }

  confirmCancelBooking(): void {
    this.showCancelModal = false;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookingService.cancelBooking(this.booking.bookingId).subscribe({
      next: () => {
        this.successMessage = 'Booking cancelled successfully';
        this.fetchBooking(); // refresh state
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Unable to cancel booking';
        this.cdr.detectChanges();
      }
    });
  }
}
