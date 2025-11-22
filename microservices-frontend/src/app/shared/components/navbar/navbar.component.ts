import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button (click)="toggleSidebar()">
        <mat-icon>menu</mat-icon>
      </button>
      
      <span class="app-title">Customer Management</span>
      
      <span class="spacer"></span>
      
      <button mat-icon-button [matMenuTriggerFor]="notificationMenu">
        <mat-icon [matBadge]="notificationCount" matBadgeColor="warn">notifications</mat-icon>
      </button>
      
      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <mat-menu #notificationMenu="matMenu">
      <div class="notification-header">
        <h3>Notifications</h3>
      </div>
      <button mat-menu-item>
        <mat-icon>info</mat-icon>
        <span>No new notifications</span>
      </button>
    </mat-menu>

    <mat-menu #userMenu="matMenu">
      <div class="user-info">
        <p class="user-name">{{ currentUser?.name }}</p>
        <p class="user-email">{{ currentUser?.email }}</p>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item routerLink="/profile">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item routerLink="/settings">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .app-title {
      font-size: 20px;
      font-weight: 500;
      margin-left: 16px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-info {
      padding: 16px;
      min-width: 200px;
    }

    .user-name {
      font-weight: 500;
      margin: 0 0 4px 0;
      color: #333;
    }

    .user-email {
      font-size: 12px;
      color: #666;
      margin: 0;
    }

    .notification-header {
      padding: 16px;
    }

    .notification-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }

    ::ng-deep .mat-mdc-menu-content {
      padding: 0 !important;
    }
  `]
})
export class NavbarComponent {
  currentUser: User | null = null;
  notificationCount = 0;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    // This will be handled by the parent layout component
    const event = new CustomEvent('toggleSidebar');
    window.dispatchEvent(event);
  }

  logout(): void {
    this.authService.logout();
  }
}
