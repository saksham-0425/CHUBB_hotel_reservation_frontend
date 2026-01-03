import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../../shared/models/register-request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../shared/models/login-request';
import { LoginResponse } from '../../shared/models/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private BASE_URL = 'http://localhost:8765/auth';

  constructor(private http: HttpClient) {}

 
  register(request: RegisterRequest): Observable<string> {
    return this.http.post(
      `${this.BASE_URL}/register`,
      request,
      { responseType: 'text' }
    );
  }


  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.BASE_URL}/login`,
      request
    );
  }


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }

  getEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub; 
    } catch {
      return null;
    }
  }
}
