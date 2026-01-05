import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../core/services/hotel';
import { Hotel } from '../../../../shared/models/hotel';
import { SearchBarComponent } from '../../../../shared/ui/search-bar/search-bar.component';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchBarComponent,
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {

  city = '';
  hotels: Hotel[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.city = params['city'];
      if (this.city) {
        this.searchHotels(this.city);
      }
    });
  }

  handleSearch(city: string) {
    if (city) {
      // Update URL to reflect new search
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { city },
        queryParamsHandling: 'merge', // preserve other params if existing
      });
      // The subscription in ngOnInit will pick this up
    }
  }

  searchHotels(city: string) {
    this.loading = true;
    this.error = '';
    this.hotels = [];

    this.hotelService.searchByCity(city).subscribe({
      next: (res) => {
        this.hotels = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'No hotels found or error occurred';
        this.loading = false;
      }
    });
  }

  goToAvailability(hotelId: number) {
    this.router.navigate(['/user/hotels', hotelId, 'availability']);
  }
}