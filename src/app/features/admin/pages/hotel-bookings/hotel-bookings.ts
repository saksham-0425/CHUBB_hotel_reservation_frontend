import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking';
import { BookingResponse } from '../../../../shared/models/booking';

@Component({
  selector: 'app-hotel-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-bookings.html',
  styleUrls: ['./hotel-bookings.css']
})
export class HotelBookingsComponent implements OnInit {

  bookings: BookingResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.errorMessage = '';

    const hotelId = Number(this.route.snapshot.paramMap.get('id'));

    if (!hotelId) {
      this.errorMessage = 'Invalid hotel ID';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.bookingService.getBookingsByHotel(hotelId).subscribe({
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
}
