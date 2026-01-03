import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  get role(): string | null {
    return this.authService.getRoleFromToken();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}
