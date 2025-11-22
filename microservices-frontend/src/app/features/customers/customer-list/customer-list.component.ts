import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Customer } from '../../../core/models/customer.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  template: `
    <div class="customer-list">
      <div class="page-header">
        <h1>Customers</h1>
        <button mat-raised-button color="primary" routerLink="/customers/create">
          <mat-icon>add</mat-icon>
          Add Customer
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <div class="table-controls">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search</mat-label>
              <input matInput [(ngModel)]="searchTerm" (keyup)="applyFilter()" placeholder="Search customers...">
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
          </div>

          <div class="table-container" *ngIf="!loading; else loadingTemplate">
            <table mat-table [dataSource]="dataSource" matSort class="customer-table">

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let customer">{{ customer.name }}</td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
              </ng-container>

              <ng-container matColumnDef="address">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Address</th>
                <td mat-cell *matCellDef="let customer">{{ customer.address || 'N/A' }}</td>
              </ng-container>

              <ng-container matColumnDef="dateOfBirth">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Date of Birth</th>
                <td mat-cell *matCellDef="let customer">{{ customer.dateOfBirth | date:'mediumDate' }}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let customer">
                  <button mat-icon-button color="primary" [routerLink]="['/customers', customer.id]" matTooltip="View">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" [routerLink]="['/customers', customer.id, 'edit']" matTooltip="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteCustomer(customer)" matTooltip="Delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
            </table>
          </div>

          <ng-template #loadingTemplate>
            <div class="loading-container">
              <mat-spinner></mat-spinner>
              <p>Loading customers...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .customer-list {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-header h1 {
      font-size: 32px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .table-controls {
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
    }

    .table-container {
      overflow-x: auto;
    }

    .customer-table {
      width: 100%;
      background: white;
    }

    .table-row:hover {
      background-color: #f5f5f5;
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
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
    }
  `]
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'address', 'dateOfBirth', 'actions'];
  dataSource: MatTableDataSource<Customer>;
  loading = true;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private notification: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Customer>([]);
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        const customers = response.content || response;
        this.dataSource.data = customers;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.notification.error('Failed to load customers');
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: () => {
          this.notification.success('Customer deleted successfully');
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
          this.notification.error('Failed to delete customer');
        }
      });
    }
  }
}
