import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { RoomCategory } from '../../../../shared/models/room-category';
import { AdminHotel } from '../../../../shared/models/admin-hotel';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-details.html',
  styleUrls: ['./hotel-details.css']
})
export class HotelDetailsComponent implements OnInit {

  hotel!: AdminHotel;
  categories: RoomCategory[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchHotelDetails();
  }

  fetchHotelDetails(): void {
    this.loading = true;
    this.errorMessage = '';

    const hotelId = Number(this.route.snapshot.paramMap.get('id'));

    if (!hotelId) {
      this.errorMessage = 'Invalid hotel ID';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotelRes) => {
        this.hotel = hotelRes;

        this.hotelService.getCategoriesByHotel(hotelId).subscribe({
          next: (catRes) => {
            this.categories = catRes ?? [];
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Failed to load room categories';
            this.loading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load hotel details';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewBookings(): void {
    this.router.navigate(['/admin/hotels', this.hotel.id, 'bookings']);
  }
}
