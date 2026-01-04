import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goToBookings(): void {
    this.router.navigate(['/manager/bookings']);
    this.cdr.detectChanges();
  }

  goToCategories(): void {
    this.router.navigate(['/manager/categories']);
    this.cdr.detectChanges();
  }

  goToRooms(): void {
    this.router.navigate(['/manager/rooms']);
    this.cdr.detectChanges();
  }

  goToReceptionists(): void {
  this.router.navigate(['/manager/receptionists']);
  this.cdr.detectChanges();
}
}
