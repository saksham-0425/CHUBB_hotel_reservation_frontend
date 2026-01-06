import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from '../../services/hotel';
import { AdminHotel } from '../../../../shared/models/admin-hotel';
import { RoomCategory } from '../../../../shared/models/room-category';

@Component({
  selector: 'app-create-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-hotel.html',
  styleUrls: ['./create-hotel.css']
})
export class CreateHotelComponent {

  name = '';
  city = '';
  address = '';
  description = '';
  managerEmail = '';
  amenitiesText = '';

  roomCategories: RoomCategory[] = [
    { category: '', totalRooms: 0, capacity: 1, basePrice: 0 }
  ];
  loading = false;
  successMessage = '';
  errorMessage = '';
  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}
  addCategory(): void {
    this.roomCategories.push({
      category: '',
      totalRooms: 0,
      capacity: 1,
      basePrice: 0
    });
  }
  createHotel(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    const payload: AdminHotel = {
      name: this.name,
      city: this.city,
      address: this.address,
      description: this.description,
      managerEmail: this.managerEmail,
      amenities: this.amenitiesText
        .split(',')
        .map(a => a.trim())
        .filter(a => a.length > 0),
      roomCategories: this.roomCategories
    };
    this.hotelService.createHotel(payload).subscribe({
      next: () => {
        this.successMessage = 'Hotel successfully created 🎉';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Failed to create hotel. Please try again.';
        this.loading = false;
      }
    });
  }
}
