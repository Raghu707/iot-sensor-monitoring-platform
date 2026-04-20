import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,               // ✅ REQUIRED
  imports: [CommonModule, FormsModule],
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponent {

  users = [
    { email: 'admin@test.com' },
    { email: 'user@test.com' }
  ];

  newEmail = '';

  addUser() {
    if (!this.newEmail) return;
    this.users.push({ email: this.newEmail });
    this.newEmail = '';
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}