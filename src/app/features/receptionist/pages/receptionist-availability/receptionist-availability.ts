import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../services/hotel';

@Component({
  standalone: true,
  selector: 'app-receptionist-availability',
  imports: [CommonModule],
  templateUrl: './receptionist-availability.html'
})
export class ReceptionistAvailabilityComponent implements OnInit {

  rooms: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.bootstrapReceptionistContext();
}

bootstrapReceptionistContext(): void {
  this.loading = true;

  this.hotelService.getHotelForReceptionist().subscribe({
    next: hotel => {
     
      localStorage.setItem('hotelId', hotel.id.toString());
      this.loadRooms();
    },
    error: () => {
      this.errorMessage = 'Hotel not assigned to receptionist';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}


  loadRooms(): void {
    const hotelId = localStorage.getItem('hotelId');

    if (!hotelId) {
      this.errorMessage = 'Hotel not assigned';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;

    this.hotelService.getHotelRooms(Number(hotelId)).subscribe({
      next: data => {
        this.rooms = data;
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

  makeAvailable(roomId: number): void {
    const confirmed = confirm('Mark this room as AVAILABLE?');
    if (!confirmed) return;

    this.hotelService.updateRoomStatus(roomId, 'AVAILABLE').subscribe({
      next: () => {
        alert('Room marked as AVAILABLE');
        this.loadRooms(); 
      },
      error: () => {
        alert('Failed to update room status');
      }
    });
  }
}
