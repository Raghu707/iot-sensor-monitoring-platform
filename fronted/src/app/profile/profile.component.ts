import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth-service.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  email = this.auth.getUserEmail();

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}