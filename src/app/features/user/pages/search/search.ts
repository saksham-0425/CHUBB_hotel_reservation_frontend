import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../../../core/services/hotel';
import { Hotel } from '../../../../shared/models/hotel';

import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {

  city = '';
  hotels: Hotel[] = [];
  error = '';
 

  constructor(private hotelService: HotelService,
     private router: Router
  ) {}

  searchHotels() {
    if (!this.city) {
      this.error = 'City is required';
      return;
    }

    this.hotelService.searchByCity(this.city).subscribe({
      next: (res) => {
        this.hotels = res;
        this.error = '';
      },
      error: () => {
        this.error = 'No hotels found';
        this.hotels = [];
      }
    });
  }

  goToAvailability(hotelId: number) {
  this.router.navigate([
    '/user/hotels',
    hotelId,
    'availability'
  ]);
}
}