import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receptionist-dashboard.html',
  styleUrls: ['./receptionist-dashboard.css']
})
export class ReceptionistDashboardComponent {

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goToBookingLookup(): void {
    this.router.navigate(['/receptionist/bookings']);
    this.cdr.detectChanges();
  }

  goToAvailability(): void {
    this.router.navigate(['/receptionist/availability']);
    this.cdr.detectChanges();
  }
}
