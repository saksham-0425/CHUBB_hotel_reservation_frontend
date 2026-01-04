import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room';
import { ManagerService } from '../../services/manager';

@Component({
  selector: 'app-manager-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-rooms.html',
  styleUrls: ['./manager-rooms.css']
})
export class ManagerRoomsComponent implements OnInit {

  rooms: any[] = [];
  loading = true;
  errorMessage = '';
  hotelId!: number;

  roomNumber = '';
  categoryId!: number;
  start!: number;
  end!: number;

  constructor(
    private roomService: RoomService,
    private managerService: ManagerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedHotelId = localStorage.getItem('managerHotelId');

    if (storedHotelId) {
      this.hotelId = Number(storedHotelId);
      this.loadRooms();
    } else {
      this.loadManagerHotelAndRooms();
    }
  }

  loadManagerHotelAndRooms(): void {
    this.loading = true;

    this.managerService.getManagerHotel().subscribe({
      next: (hotel) => {
        this.hotelId = hotel.id;
        localStorage.setItem('managerHotelId', hotel.id.toString());
        this.loadRooms();
      },
      error: () => {
        this.errorMessage = 'Failed to load manager hotel';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadRooms(): void {
    this.loading = true;
    this.errorMessage = '';

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
    const payload = {
      roomNumber: this.roomNumber,
      categoryId: this.categoryId
    };

    this.roomService.createRoom(this.hotelId, payload).subscribe(() => {
      alert('Room created');
      this.roomNumber = '';
      this.loadRooms();
    });
  }

  bulkCreate(): void {
    const payload = {
      categoryId: this.categoryId,
      start: this.start,
      end: this.end
    };

    this.roomService.bulkCreateRooms(this.hotelId, payload).subscribe(() => {
      alert('Rooms created');
      this.loadRooms();
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'AVAILABLE': return 'green';
      case 'OCCUPIED': return 'red';
      case 'MAINTENANCE': return 'orange';
      default: return 'black';
    }
  }
}
