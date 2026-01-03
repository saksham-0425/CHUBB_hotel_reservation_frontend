import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private authService: AuthService) {}

  register() {
  this.authService.register({
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {
      this.message = res;   
      this.error = '';
    },
    error: (err) => {
     
      if (typeof err.error === 'string') {
        this.error = err.error;
      } else {
        this.error = 'Registration failed';
      }
      this.message = '';
    }
  });
}
}
