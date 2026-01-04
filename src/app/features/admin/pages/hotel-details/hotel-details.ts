import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { RoomCategory } from '../../../../shared/models/room-category';
import { AdminHotel } from '../../../../shared/models/admin-hotel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-details.html',
  styleUrls: ['./hotel-details.css']
})
export class HotelDetailsComponent implements OnInit {

  hotel!: AdminHotel;
  categories: RoomCategory[] = [];

  loading = true;
  errorMessage = '';
  selectedCategoryId: number | null = null;
roomStart = '';
roomEnd = '';
creatingRooms = false;

showAddCategory = false;

newCategory = {
  category: '',
  totalRooms: 0,
  capacity: 1,
  basePrice: 0
};

addingCategory = false;

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
            this.categories = [...(catRes ?? [])];
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

  openCreateRooms(categoryId: number): void {
  this.selectedCategoryId = categoryId;
  this.roomStart = '';
  this.roomEnd = '';
}

cancelCreateRooms(): void {
  this.selectedCategoryId = null;
}

createRooms(): void {
  if (!this.hotel || this.hotel.id == null) {
    alert('Hotel not loaded yet');
    return;
  }

  if (!this.selectedCategoryId || !this.roomStart || !this.roomEnd) {
    alert('Please fill all fields');
    return;
  }

  if (Number(this.roomStart) > Number(this.roomEnd)) {
    alert('Start room number cannot be greater than end');
    return;
  }

  this.creatingRooms = true;

  this.hotelService.createRoomsBulk(
    this.hotel.id, 
    {
      categoryId: this.selectedCategoryId,
      start: this.roomStart,
      end: this.roomEnd
    }
  ).subscribe({
    next: () => {
      alert('Rooms created successfully');
      this.creatingRooms = false;
      this.selectedCategoryId = null;
      this.fetchHotelDetails();
      this.cdr.detectChanges();
    },
    error: () => {
      alert('Failed to create rooms');
      this.creatingRooms = false;
      this.cdr.detectChanges();
    }
  });
}

openAddCategory(): void {
  this.showAddCategory = true;
}

cancelAddCategory(): void {
  this.showAddCategory = false;
  this.newCategory = {
    category: '',
    totalRooms: 0,
    capacity: 1,
    basePrice: 0
  };
}

addCategory(): void {
  if (!this.hotel?.id) {
    alert('Hotel not loaded');
    return;
  }

  const { category, totalRooms, capacity, basePrice } = this.newCategory;

  if (!category || totalRooms <= 0 || capacity <= 0 || basePrice <= 0) {
    alert('Please fill all fields correctly');
    return;
  }

  this.addingCategory = true;

  this.hotelService
    .addCategory(this.hotel.id, this.newCategory)
    .subscribe({
      next: () => {
  alert('Category added successfully');

  this.addingCategory = false;
  this.showAddCategory = false;

  this.categories = [];

  this.fetchHotelDetails();
  this.cdr.detectChanges();
},
      error: () => {
        alert('Failed to add category');
        this.addingCategory = false;
        this.cdr.detectChanges();
      }
    });
}


}
