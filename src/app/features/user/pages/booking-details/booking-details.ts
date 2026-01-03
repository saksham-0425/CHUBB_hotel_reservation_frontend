import { Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bookingService.getBookingById(id).subscribe({
      next: (res) => {
        this.booking = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Unable to fetch booking';
        this.loading = false;
      }
    });
  }
}
