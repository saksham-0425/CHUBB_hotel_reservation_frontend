import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room';
import { ManagerService } from '../../services/manager';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-manager-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-rooms.html',
  styleUrls: ['./manager-rooms.css']
})
export class ManagerRoomsComponent implements OnInit {

  rooms: any[] = [];
  categories: any[] = [];

  loading = true;
  errorMessage = '';
  successMessage = '';

  hotelId!: number;

  roomNumber = '';
  selectedCategoryId!: number;

  start!: number;
  end!: number;
  singleCategoryId: number | null = null;
bulkCategoryId: number | null = null;
creatingSingle = false;
creatingBulk = false;


  creating = false;

  constructor(
    private roomService: RoomService,
    private managerService: ManagerService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedHotelId = localStorage.getItem('managerHotelId');

    if (storedHotelId) {
      this.hotelId = Number(storedHotelId);
      this.loadInitialData();
    } else {
      this.loadManagerHotelAndData();
    }
  }

  loadManagerHotelAndData(): void {
    this.managerService.getManagerHotel().subscribe({
      next: (hotel) => {
        this.hotelId = hotel.id;
        localStorage.setItem('managerHotelId', hotel.id.toString());
        this.loadInitialData();
      },
      error: () => {
        this.errorMessage = 'Failed to load manager hotel';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadInitialData(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories ?? [];
        this.loadRooms();
      },
      error: () => {
        this.errorMessage = 'Failed to load room categories';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadRooms(): void {
    this.roomService.getRooms(this.hotelId).subscribe({
      next: (data) => {
        this.rooms = data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load rooms';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  createRoom(): void {
  if (!this.singleCategoryId || !this.roomNumber) return;

  this.creatingSingle = true;
  this.successMessage = '';
  this.errorMessage = '';

  const payload = {
    roomNumber: this.roomNumber,
    categoryId: this.singleCategoryId
  };

  this.roomService.createRoom(this.hotelId, payload).subscribe({
    next: () => {
      this.successMessage = 'Room created successfully';
      this.roomNumber = '';
      this.singleCategoryId = null;
      this.creatingSingle = false;
      this.loadRooms();
      this.cdr.detectChanges();
    },
    error: () => {
      this.errorMessage = 'Failed to create room';
      this.creatingSingle = false;
      this.cdr.detectChanges();
    }
  });
}

bulkCreate(): void {
  if (!this.bulkCategoryId || !this.start || !this.end) return;

  this.creatingBulk = true;
  this.successMessage = '';
  this.errorMessage = '';

  const payload = {
    categoryId: this.bulkCategoryId,
    start: this.start,
    end: this.end
  };

  this.roomService.bulkCreateRooms(this.hotelId, payload).subscribe({
    next: () => {
      this.successMessage = 'Rooms created successfully';
      this.start = undefined!;
      this.end = undefined!;
      this.bulkCategoryId = null;
      this.creatingBulk = false;
      this.loadRooms();
      this.cdr.detectChanges();
    },
    error: () => {
      this.errorMessage = 'Failed to create rooms';
      this.creatingBulk = false;
      this.cdr.detectChanges();
    }
  });
}

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
