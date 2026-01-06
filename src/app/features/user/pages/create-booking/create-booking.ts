import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { BookingService } from '../../../../core/services/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-booking.html',
  styleUrls: ['./create-booking.css']
})
export class CreateBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  hotelId!: number;
  roomCategoryId!: number;

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.queryParamMap.get('hotelId'));
    this.roomCategoryId = Number(this.route.snapshot.queryParamMap.get('categoryId'));

    const checkIn = this.route.snapshot.queryParamMap.get('checkIn');
    const checkOut = this.route.snapshot.queryParamMap.get('checkOut');

    this.bookingForm = this.fb.group({
      guestName: ['', [Validators.required, Validators.minLength(2)]],
      numberOfGuests: [1, [Validators.required, Validators.min(1)]],
      numberOfRooms: [1, [Validators.required, Validators.min(1)]],
      checkInDate: [{ value: checkIn, disabled: true }, Validators.required],
      checkOutDate: [{ value: checkOut, disabled: true }, Validators.required]
    });
  }

  submitBooking(): void {
    if (this.bookingForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    const payload = {
      hotelId: this.hotelId,
      roomCategoryId: this.roomCategoryId,
      ...this.bookingForm.getRawValue()
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/user/bookings', res.bookingId]);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Booking failed';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
