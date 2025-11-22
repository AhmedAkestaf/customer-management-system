import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomerService } from '../customer.service';
import { WalletService } from '../../wallet/wallet.service';
import { Customer } from '../../../core/models/customer.model';
import { Wallet } from '../../../core/models/wallet.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  template: `
    <div class="customer-detail" *ngIf="!loading; else loadingTemplate">
      <div class="page-header">
        <button mat-icon-button routerLink="/customers">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Customer Details</h1>
        <div class="actions">
          <button mat-raised-button color="accent" [routerLink]="['/customers', customer?.id, 'edit']">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
          <button mat-raised-button color="warn" (click)="deleteCustomer()">
            <mat-icon>delete</mat-icon>
            Delete
          </button>
        </div>
      </div>

      <mat-tab-group>
        <mat-tab label="Information">
          <mat-card class="info-card">
            <mat-card-content>
              <div class="info-grid">
                <div class="info-item">
                  <label>ID</label>
                  <p>{{ customer?.id }}</p>
                </div>
                <div class="info-item">
                  <label>Name</label>
                  <p>{{ customer?.name }}</p>
                </div>
                <div class="info-item">
                  <label>Email</label>
                  <p>{{ customer?.email }}</p>
                </div>
                <div class="info-item">
                  <label>Address</label>
                  <p>{{ customer?.address || 'N/A' }}</p>
                </div>
                <div class="info-item">
                  <label>Date of Birth</label>
                  <p>{{ customer?.dateOfBirth | date:'mediumDate' }}</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Wallet">
          <mat-card class="info-card">
            <mat-card-content>
              <div *ngIf="wallet; else noWallet">
                <div class="info-grid">
                  <div class="info-item">
                    <label>Wallet ID</label>
                    <p>{{ wallet.walletId }}</p>
                  </div>
                  <div class="info-item">
                    <label>Balance</label>
                    <p>{{ wallet.balance | currency:wallet.currency }}</p>
                  </div>
                  <div class="info-item">
                    <label>Status</label>
                    <p>{{ wallet.status }}</p>
                  </div>
                  <div class="info-item">
                    <label>Created At</label>
                    <p>{{ wallet.createdAt | date:'medium' }}</p>
                  </div>
                </div>
              </div>
              <ng-template #noWallet>
                <p>No wallet associated with this customer.</p>
              </ng-template>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>

    <ng-template #loadingTemplate>
      <div class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading customer details...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .customer-detail {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .page-header h1 {
      flex: 1;
      font-size: 32px;
      font-weight: 600;
      margin: 0;
      color: #333;
    }

    .actions {
      display: flex;
      gap: 12px;
    }

    .info-card {
      margin-top: 16px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .info-item label {
      display: block;
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
      text-transform: uppercase;
      font-weight: 500;
    }

    .info-item p {
      font-size: 16px;
      color: #333;
      margin: 0;
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
  `]
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer | null = null;
  wallet: Wallet | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private walletService: WalletService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomer(id);
      this.loadWallet(id);
    }
  }

  loadCustomer(id: string): void {
    this.customerService.getCustomer(id).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.notification.error('Failed to load customer');
        this.loading = false;
      }
    });
  }

  loadWallet(customerId: string): void {
    this.walletService.getWalletByCustomerId(customerId).subscribe({
      next: (wallet) => {
        this.wallet = wallet;
      },
      error: (error) => {
        console.error('Error loading wallet:', error);
      }
    });
  }

  deleteCustomer(): void {
    if (this.customer && confirm(`Are you sure you want to delete ${this.customer.name}?`)) {
      this.customerService.deleteCustomer(this.customer.id).subscribe({
        next: () => {
          this.notification.success('Customer deleted successfully');
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.notification.error('Failed to delete customer');
        }
      });
    }
  }
}
