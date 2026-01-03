import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvailabilityService } from '../../../../core/services/availability';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-availability.html'
})
export class HotelAvailabilityComponent {

  hotelId!: number;
  checkIn = '';
  checkOut = '';
  availability: any;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private availabilityService: AvailabilityService,
    private router: Router
  ) {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
  }

  searchAvailability() {
    if (!this.checkIn || !this.checkOut) {
      this.error = 'Please select dates';
      return;
    }

    this.availabilityService
      .getAvailability(this.hotelId, this.checkIn, this.checkOut)
      .subscribe({
        next: res => {
          this.availability = res;
          this.error = '';
        },
        error: () => {
          this.error = 'No availability found';
        }
      });
  }

  goToBooking(categoryId: number) {
  this.router.navigate(
    ['/user/bookings/create'],
    {
      queryParams: {
        hotelId: this.hotelId,
        categoryId: categoryId,
        checkIn: this.checkIn,
        checkOut: this.checkOut
      }
    }
  );
}
}
