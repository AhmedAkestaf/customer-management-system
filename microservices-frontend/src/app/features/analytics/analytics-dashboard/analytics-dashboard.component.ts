import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnalyticsService } from '../analytics.service';
import { CustomerService } from '../../customers/customer.service';
import { AnalyticsDashboard, CustomerEvent } from '../../../core/models/analytics.model';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="analytics-dashboard">
      <h1>Analytics Dashboard</h1>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading analytics...</p>
      </div>

      <div *ngIf="!loading && dashboard" class="dashboard-content">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>event</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Total Events</h3>
                <p class="stat-value">{{ dashboard.totalEvents }}</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>person_add</mat-icon>
              </div>
              <div class="stat-info">
                <h3>New Customers Today</h3>
                <p class="stat-value">{{ dashboard.newCustomersToday }}</p>
              </div>
            </mat-card-content>
          </mat-card>


          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Total Customers</h3>
                <p class="stat-value">{{ totalCustomers }}</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card" *ngIf="dashboard.todayAnalytics">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>delete</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Deleted Today</h3>
                <p class="stat-value">{{ dashboard.todayAnalytics.deletedCustomers }}</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Recent Events -->
        <mat-card class="events-card">
          <mat-card-header>
            <mat-card-title>Recent Events</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="dashboard.recentEvents" class="events-table">
              <ng-container matColumnDef="eventType">
                <th mat-header-cell *matHeaderCellDef>Event Type</th>
                <td mat-cell *matCellDef="let event">
                  <span class="event-badge" [class]="getEventClass(event.eventType)">
                    {{ event.eventType }}
                  </span>
                </td>
              </ng-container>

              <ng-container matColumnDef="customerId">
                <th mat-header-cell *matHeaderCellDef>Customer ID</th>
                <td mat-cell *matCellDef="let event">{{ event.customerId }}</td>
              </ng-container>

              <ng-container matColumnDef="timestamp">
                <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                <td mat-cell *matCellDef="let event">{{ event.timestamp | date:'medium' }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <p *ngIf="!dashboard.recentEvents || dashboard.recentEvents.length === 0" class="no-events">
              No recent events
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!loading && error" class="error-container">
        <mat-icon>error</mat-icon>
        <p>{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .analytics-dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }

    .loading-container,
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      text-align: center;
    }

    .error-container mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #f44336;
      margin-bottom: 16px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px !important;
    }

    .stat-icon {
      background: #e3f2fd;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1976d2;
    }

    .stat-info h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }

    .stat-value {
      margin: 4px 0 0 0;
      font-size: 28px;
      font-weight: 600;
      color: #333;
    }

    .events-card {
      margin-top: 24px;
    }

    .events-table {
      width: 100%;
    }

    .event-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .event-badge.created {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .event-badge.updated {
      background: #e3f2fd;
      color: #1976d2;
    }

    .event-badge.deleted {
      background: #ffebee;
      color: #c62828;
    }

    .no-events {
      text-align: center;
      padding: 24px;
      color: #666;
    }
  `]
})
export class AnalyticsDashboardComponent implements OnInit {
  dashboard: AnalyticsDashboard | null = null;
  loading = true;
  error: string | null = null;
  totalCustomers = 0;
  displayedColumns = ['eventType', 'customerId', 'timestamp'];

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    // Fetch analytics data
    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load analytics data';
        this.loading = false;
        console.error('Error loading analytics:', err);
      }
    });

    // Fetch total customers from customer service
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
        this.totalCustomers = 0;
      }
    });
  }

  getEventClass(eventType: string): string {
    return eventType.toLowerCase();
  }
}
