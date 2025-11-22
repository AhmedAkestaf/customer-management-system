import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerService } from '../customer.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-customer-create',
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
    <div class="customer-create">
      <h1>Create New Customer</h1>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter customer name">
              <mat-error *ngIf="customerForm.hasError('required', 'name')">Name is required</mat-error>
              <mat-error *ngIf="customerForm.hasError('minlength', 'name')">Name must be at least 3 characters</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter email">
              <mat-error *ngIf="customerForm.hasError('required', 'email')">Email is required</mat-error>
              <mat-error *ngIf="customerForm.hasError('email', 'email')">Invalid email format</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Address</mat-label>
              <textarea matInput formControlName="address" rows="3" placeholder="Enter address"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Date of Birth</mat-label>
              <input matInput type="date" formControlName="dateOfBirth">
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="cancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="customerForm.invalid || loading">
                <span *ngIf="!loading">Create Customer</span>
                <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .customer-create {
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

    mat-spinner {
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.loading = true;

      const customerData = {
        ...this.customerForm.value,
        registeredDate: new Date().toISOString().split('T')[0]
      };

      this.customerService.createCustomer(customerData).subscribe({
        next: (customer) => {
          this.notification.success('Customer created successfully!');
          this.router.navigate(['/customers', customer.id]);
        },
        error: (error) => {
          this.loading = false;
          this.notification.error('Failed to create customer');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
