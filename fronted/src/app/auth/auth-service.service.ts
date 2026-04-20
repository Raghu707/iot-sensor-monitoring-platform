import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:5000/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/login`,
      { email, password }
    );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/register`,
      { email, password }
    );
  }

  /** ✅ NEW: get logged-in user's email */
  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  /** ✅ NEW: logout user */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /** ✅ Optional helper */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}