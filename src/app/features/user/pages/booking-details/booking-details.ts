import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../../core/services/booking';
import { BookingResponse } from '../../../../shared/models/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-details.html'
})
export class BookingDetailsComponent implements OnInit {

  booking!: BookingResponse;
  loading = true;
  errorMessage = '';
  paymentDone = false;

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
  const confirmed = confirm('Do you want to proceed with payment?');
  if (!confirmed) return;

  this.bookingService.payForBooking(this.booking.bookingId).subscribe({
    next: () => {
      alert('Payment successful');
      this.paymentDone = true;  
      this.cdr.detectChanges();
    },
    error: () => {
      alert('Payment failed');
    }
  });
}

}
