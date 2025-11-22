import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="profile">
      <h1>Profile</h1>

      <mat-card class="profile-card">
        <mat-card-header>
          <div class="profile-avatar">
            <mat-icon>person</mat-icon>
          </div>
          <mat-card-title>{{ username }}</mat-card-title>
          <mat-card-subtitle>{{ email }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="info-grid">
            <div class="info-item">
              <label>Username</label>
              <p>{{ username }}</p>
            </div>

            <div class="info-item">
              <label>Email</label>
              <p>{{ email }}</p>
            </div>

            <div class="info-item">
              <label>Role</label>
              <p>{{ role || 'User' }}</p>
            </div>

            <div class="info-item">
              <label>Status</label>
              <p class="status-active">Active</p>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="warn" (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .profile {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }

    .profile-card {
      margin-top: 16px;
    }

    mat-card-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 4px 4px 0 0;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .profile-avatar mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: white;
    }

    mat-card-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: white !important;
    }

    mat-card-subtitle {
      font-size: 14px;
      margin: 4px 0 0 0;
      color: rgba(255, 255, 255, 0.8) !important;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      padding: 24px 0;
    }

    .info-item label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .info-item p {
      margin: 0;
      font-size: 16px;
      color: #333;
      font-weight: 500;
    }

    .status-active {
      color: #4caf50;
    }

    mat-card-actions {
      padding: 16px 24px;
      border-top: 1px solid #e0e0e0;
    }
  `]
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  role: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.name || currentUser.email?.split('@')[0] || 'User';
      this.email = currentUser.email || 'user@example.com';
      this.role = currentUser.roles?.[0] || 'USER';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
