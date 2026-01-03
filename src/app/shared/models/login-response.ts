export interface LoginResponse {
  token: string;
  role: 'ADMIN' | 'MANAGER' | 'RECEPTIONIST' | 'GUEST';
}
