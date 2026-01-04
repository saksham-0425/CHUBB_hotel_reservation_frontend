import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, switchMap, of } from 'rxjs';
import { RegisterRequest } from '../../shared/models/register-request';
import { LoginRequest } from '../../shared/models/login-request';
import { LoginResponse } from '../../shared/models/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private AUTH_BASE_URL = 'http://localhost:8765/auth';
  private HOTEL_BASE_URL = 'http://localhost:8765/hotels';

  constructor(private http: HttpClient) {}
  register(request: RegisterRequest): Observable<string> {
    return this.http.post(
      `${this.AUTH_BASE_URL}/register`,
      request,
      { responseType: 'text' }
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.AUTH_BASE_URL}/login`,
      request
    ).pipe(
      tap(res => {
        this.saveToken(res.token);
      }),
      switchMap(res => {
        if (res.role === 'MANAGER') {
          return this.fetchManagerHotel().pipe(
            tap(hotel => {
              localStorage.setItem(
                'managerHotelId',
                hotel.id.toString()
              );
            }),
            switchMap(() => of(res))
          );
        }
        return of(res);
      })
    );
  }

  private fetchManagerHotel(): Observable<any> {
    return this.http.get(
      `${this.HOTEL_BASE_URL}/internal/manager`
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
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
