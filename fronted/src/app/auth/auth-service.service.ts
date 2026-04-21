import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.apiUrl;   // ✅ backend base URL

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/auth/login`,        // ✅ FIXED
      { email, password }
    );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,     // ✅ FIXED
      { email, password }
    );
  }

  /** ✅ get logged-in user's email */
  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  /** ✅ logout user */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /** ✅ check login */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}