import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  isHome = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isHome = this.router.url === '/';
      });
  }

  get role(): string | null {
    return this.authService.getRoleFromToken();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  goHome(): void {
  const role = this.authService.getRoleFromToken();

  if (!role) {
    this.router.navigate(['/']);
    return;
  }

  switch (role) {
    case 'ADMIN':
      this.router.navigate(['/admin/dashboard']);
      break;

    case 'MANAGER':
      this.router.navigate(['/manager']);
      break;

    case 'RECEPTIONIST':
      this.router.navigate(['/receptionist']);
      break;

    default:
      this.router.navigate(['/']);
  }
}

}
