import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { AnalyticsService } from '../analytics/analytics.service';
import { CustomerService } from '../customers/customer.service';
import { AnalyticsDashboard } from '../../core/models/analytics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    BaseChartDirective
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <button mat-raised-button color="primary" (click)="refreshData()">
          <mat-icon>refresh</mat-icon>
          Refresh
        </button>
      </div>

      <div class="stats-grid" *ngIf="!loading; else loadingTemplate">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background-color: #e3f2fd;">
              <mat-icon style="color: #1976d2;">people</mat-icon>
            </div>
            <div class="stat-details">
              <h3>Total Customers</h3>
              <p class="stat-value">{{ totalCustomers }}</p>
              <span class="stat-label">All time</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background-color: #e8f5e9;">
              <mat-icon style="color: #4caf50;">person_add</mat-icon>
            </div>
            <div class="stat-details">
              <h3>New Today</h3>
              <p class="stat-value">{{ stats?.newCustomersToday || 0 }}</p>
              <span class="stat-label">Customers added today</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background-color: #fff3e0;">
              <mat-icon style="color: #ff9800;">event</mat-icon>
            </div>
            <div class="stat-details">
              <h3>Total Events</h3>
              <p class="stat-value">{{ stats?.totalEvents || 0 }}</p>
              <span class="stat-label">System events</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background-color: #f3e5f5;">
              <mat-icon style="color: #9c27b0;">delete</mat-icon>
            </div>
            <div class="stat-details">
              <h3>Deleted Today</h3>
              <p class="stat-value">{{ stats?.todayAnalytics?.deletedCustomers || 0 }}</p>
              <span class="stat-label">Customers deleted</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="charts-grid" *ngIf="!loading">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Customer Growth</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas baseChart
                    [data]="lineChartData"
                    [options]="lineChartOptions"
                    [type]="'line'">
            </canvas>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Recent Activities</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let event of stats?.recentEvents">
                <div class="activity-icon">
                  <mat-icon>{{ getEventIcon(event.eventType) }}</mat-icon>
                </div>
                <div class="activity-details">
                  <p class="activity-title">{{ getEventTitle(event.eventType) }}</p>
                  <span class="activity-time">{{ event.timestamp | date:'short' }}</span>
                </div>
              </div>
              <div *ngIf="!stats?.recentEvents || stats?.recentEvents?.length === 0" class="no-activities">
                <mat-icon>info</mat-icon>
                <p>No recent activities</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <ng-template #loadingTemplate>
        <div class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading dashboard data...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .dashboard-header h1 {
      font-size: 32px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .stat-details {
      flex: 1;
    }

    .stat-details h3 {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      margin: 0 0 8px 0;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin: 0 0 4px 0;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }

    .chart-card {
      min-height: 400px;
    }

    .chart-card mat-card-header {
      margin-bottom: 16px;
    }

    .chart-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }

    .activity-list {
      max-height: 350px;
      overflow-y: auto;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
      transition: background-color 0.2s;
    }

    .activity-item:hover {
      background-color: #f5f5f5;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #e3f2fd;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .activity-icon mat-icon {
      color: #1976d2;
      font-size: 20px;
    }

    .activity-details {
      flex: 1;
    }

    .activity-title {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #333;
    }

    .activity-time {
      font-size: 12px;
      color: #999;
    }

    .no-activities {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .no-activities mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px;
    }

    .loading-container p {
      margin-top: 16px;
      color: #666;
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  loading = true;
  stats: AnalyticsDashboard | null = null;
  totalCustomers = 0;

  lineChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Customers',
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    // Fetch analytics dashboard data from backend
    this.analyticsService.getDashboard().subscribe({
      next: (data: AnalyticsDashboard) => {
        this.stats = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading dashboard stats:', error);
        // Set default values on error
        this.stats = {
          totalEvents: 0,
          newCustomersToday: 0,
          todayAnalytics: null,
          recentEvents: []
        };
        this.loading = false;
      }
    });

    // Fetch total customers count from customer service
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;

        // Update chart data with actual customer count
        if (this.lineChartData.datasets && this.lineChartData.datasets[0]) {
          // Simulate growth data (in real app, this would come from analytics)
          const currentCount = customers.length;
          this.lineChartData.datasets[0].data = [
            Math.floor(currentCount * 0.5),
            Math.floor(currentCount * 0.6),
            Math.floor(currentCount * 0.7),
            Math.floor(currentCount * 0.8),
            Math.floor(currentCount * 0.9),
            currentCount
          ];
        }
      },
      error: (error: any) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  refreshData(): void {
    this.loadDashboardData();
  }

  getEventIcon(eventType: string): string {
    const eventTypeLower = eventType.toLowerCase();
    if (eventTypeLower.includes('create')) return 'person_add';
    if (eventTypeLower.includes('update')) return 'edit';
    if (eventTypeLower.includes('delete')) return 'delete';
    return 'event';
  }

  getEventTitle(eventType: string): string {
    const eventTypeLower = eventType.toLowerCase();
    if (eventTypeLower.includes('create')) return 'New customer registered';
    if (eventTypeLower.includes('update')) return 'Customer profile updated';
    if (eventTypeLower.includes('delete')) return 'Customer deleted';
    return eventType;
  }
}
