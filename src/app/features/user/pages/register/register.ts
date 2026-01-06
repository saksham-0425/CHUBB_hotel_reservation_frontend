import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';
  error = '';

  passwordRules = {
    length: false,
    uppercase: false,
    number: false,
    special: false
  };

  isPasswordValid = false;

  constructor(private authService: AuthService) {}

  checkPassword() {
    this.passwordRules.length = this.password.length >= 8;
    this.passwordRules.uppercase = /[A-Z]/.test(this.password);
    this.passwordRules.number = /[0-9]/.test(this.password);
    this.passwordRules.special = /[^A-Za-z0-9]/.test(this.password);

    this.isPasswordValid =
      this.passwordRules.length &&
      this.passwordRules.uppercase &&
      this.passwordRules.number &&
      this.passwordRules.special;
  }

  register() {
    if (!this.isPasswordValid) return;

    this.authService.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.message = res;
        this.error = '';
      },
      error: (err) => {
        this.error = typeof err.error === 'string'
          ? err.error
          : 'Registration failed';
        this.message = '';
      }
    });
  }
}
