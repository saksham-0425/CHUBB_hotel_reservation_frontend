import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../../../core/services/booking';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-booking',
  standalone: true,                   
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './create-booking.html'
})
export class CreateBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  hotelId!: number;
  roomCategoryId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.queryParamMap.get('hotelId'));
    this.roomCategoryId = Number(this.route.snapshot.queryParamMap.get('categoryId'));

    const checkIn = this.route.snapshot.queryParamMap.get('checkIn');
    const checkOut = this.route.snapshot.queryParamMap.get('checkOut');

    this.bookingForm = this.fb.group({
      guestName: ['', Validators.required],
      numberOfGuests: [1, [Validators.required, Validators.min(1)]],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      checkInDate: [checkIn, Validators.required],
      checkOutDate: [checkOut, Validators.required]
    });
  }

  submitBooking() {
    if (this.bookingForm.invalid) return;

    const payload = {
      hotelId: this.hotelId,
      roomCategoryId: this.roomCategoryId,
      ...this.bookingForm.value
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (res) => {
        
        this.router.navigate(['/user/bookings', res.bookingId]);
      },
      error: (err) => {
        alert(err.error?.message || 'Booking failed');
      }
    });
  }
}
