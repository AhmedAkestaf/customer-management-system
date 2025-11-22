import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Menu</h2>
      </div>

      <mat-nav-list>
        <a mat-list-item
           *ngFor="let item of menuItems"
           [routerLink]="item.route"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact: item.route === '/dashboard'}">
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <span matListItemTitle>{{ item.label }}</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar {
      height: 100%;
      background: #fff;
      border-right: 1px solid #e0e0e0;
    }

    .sidebar-header {
      padding: 20px 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #333;
    }

    mat-nav-list {
      padding-top: 8px;
    }

    a[mat-list-item] {
      color: #666;
      transition: all 0.3s;
    }

    a[mat-list-item]:hover {
      background-color: #f5f5f5;
    }

    a[mat-list-item].active {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    a[mat-list-item].active mat-icon {
      color: #1976d2;
    }

    mat-icon {
      color: #666;
    }
  `]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Customers', icon: 'people', route: '/customers' },
    { label: 'Analytics', icon: 'analytics', route: '/analytics' },
    { label: 'Profile', icon: 'person', route: '/profile' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  constructor(private router: Router) { }
}
