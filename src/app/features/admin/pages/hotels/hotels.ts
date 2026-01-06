import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { Hotel } from '../../../../shared/models/hotel';
import { CreateHotelComponent } from '../create-hotel/create-hotel';

@Component({
  selector: 'app-admin-hotels',
  standalone: true,
  imports: [CommonModule, CreateHotelComponent],
  templateUrl: './hotels.html',
  styleUrls: ['./hotels.css']
})
export class HotelsComponent implements OnInit {

  hotels: Hotel[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.loading = true;
    this.errorMessage = '';

    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load hotels';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openHotel(hotelId: number): void {
    this.router.navigate(['/admin/hotels', hotelId]);
  }
}
