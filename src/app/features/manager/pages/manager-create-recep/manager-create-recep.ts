import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager';

@Component({
  selector: 'app-manager-receptionist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-create-recep.html',
  styleUrls: ['./manager-create-recep.css']
})
export class ManagerReceptionistComponent implements OnInit {

  email = '';
  password = '';
  created = false;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private managerService: ManagerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  this.loading = true;

  this.managerService.getManagerHotel().subscribe({
    next: hotel => {
      localStorage.setItem(
        'managerHotelId',
        hotel.id.toString()
      );
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.loading = false;
      this.errorMessage = 'Hotel not found for manager';
      this.cdr.detectChanges();
    }
  });
}

  createReceptionist(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.managerService.createReceptionist({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.created = true;
        this.loading = false;
        this.successMessage = 'Receptionist created successfully';
        this.cdr.detectChanges();
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Creation failed';
        this.cdr.detectChanges();
      }
    });
  }

  assignReceptionist(): void {
    const hotelId = localStorage.getItem('managerHotelId');

    if (!hotelId) {
      this.errorMessage = 'Hotel not found for manager';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.managerService.assignReceptionist(
      Number(hotelId),
      { receptionistEmail: this.email }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Receptionist assigned to hotel';
        this.cdr.detectChanges();
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Assignment failed';
        this.cdr.detectChanges();
      }
    });
  }
}
