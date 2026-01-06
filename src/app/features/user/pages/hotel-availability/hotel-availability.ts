import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvailabilityService } from '../../../../core/services/availability';

@Component({
  selector: 'app-hotel-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-availability.html',
  styleUrls: ['./hotel-availability.css']
})
export class HotelAvailabilityComponent implements OnInit {

  hotelId!: number;
  today = '';
  minCheckout = '';
  checkIn = '';
  checkOut = '';

  availability: any = null;

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private availabilityService: AvailabilityService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('hotelId');
    this.hotelId = id ? Number(id) : 0;
    const todayDate = new Date();
  this.today = todayDate.toISOString().split('T')[0];
  }

  searchAvailability(): void {
  if (!this.checkIn || !this.checkOut) {
    this.errorMessage = 'Please select both check-in and check-out dates';
    return;
  }
  if (this.checkOut <= this.checkIn) {
    this.errorMessage = 'Check-out date must be after check-in date';
    return;
  }
  this.loading = true;
  this.errorMessage = '';
  this.availability = null;
  this.cdr.detectChanges();
  this.availabilityService
    .getAvailability(this.hotelId, this.checkIn, this.checkOut)
    .subscribe({
      next: (res) => {
        this.availability = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'No availability found for selected dates';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
}
  goToBooking(categoryId: number): void {
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
  onCheckInChange(): void {
  if (!this.checkIn) return;
  const checkInDate = new Date(this.checkIn);
  checkInDate.setDate(checkInDate.getDate() + 1);
  this.minCheckout = checkInDate.toISOString().split('T')[0];
  if (this.checkOut && this.checkOut < this.minCheckout) {
    this.checkOut = '';
  }
}
}
