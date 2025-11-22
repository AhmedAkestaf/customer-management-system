import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerService } from '../customer.service';
import { Customer } from '../../../core/models/customer.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="customer-edit">
      <h1>Edit Customer</h1>

      <mat-card *ngIf="!loading; else loadingTemplate">
        <mat-card-content>
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name">
              <mat-error *ngIf="customerForm.hasError('required', 'name')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="customerForm.hasError('required', 'email')">Email is required</mat-error>
              <mat-error *ngIf="customerForm.hasError('email', 'email')">Invalid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Address</mat-label>
              <textarea matInput formControlName="address" rows="3"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date of Birth</mat-label>
              <input matInput type="date" formControlName="dateOfBirth">
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="cancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="customerForm.invalid || saving">
                <span *ngIf="!saving">Save Changes</span>
                <mat-spinner *ngIf="saving" diameter="20"></mat-spinner>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <ng-template #loadingTemplate>
        <div class="loading-container">
          <mat-spinner></mat-spinner>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .customer-edit {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 60px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  loading = true;
  saving = false;
  customerId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private notification: NotificationService
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = id;
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm.patchValue(customer);
        this.loading = false;
      },
      error: (error) => {
        this.notification.error('Failed to load customer');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.saving = true;
      this.customerService.updateCustomer(this.customerId, this.customerForm.value).subscribe({
        next: () => {
          this.notification.success('Customer updated successfully!');
          this.router.navigate(['/customers', this.customerId]);
        },
        error: (error) => {
          this.saving = false;
          this.notification.error('Failed to update customer');
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/customers', this.customerId]);
  }
}
