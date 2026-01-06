import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['../register/register.css'] 
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);

        const role = this.authService.getRoleFromToken();
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
      },
      error: (err) => {
        this.error =
          typeof err.error === 'string'
            ? err.error
            : 'Invalid email or password';
      }
    });
  }
}
