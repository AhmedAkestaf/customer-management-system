import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter your email">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" 
                     formControlName="password" placeholder="Enter your password">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    class="full-width submit-btn" [disabled]="loginForm.invalid || loading">
              <span *ngIf="!loading">Sign In</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>
          </form>

          <div class="register-link">
            <p>Don't have an account? <a routerLink="/auth/register">Sign up</a></p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      width: 100%;
      max-width: 450px;
      padding: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    mat-card-title h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px 0;
      text-align: center;
      color: #333;
    }

    mat-card-title p {
      font-size: 14px;
      color: #666;
      margin: 0;
      text-align: center;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .submit-btn {
      height: 48px;
      font-size: 16px;
      font-weight: 500;
      margin-top: 10px;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
    }

    .register-link p {
      color: #666;
      font-size: 14px;
    }

    .register-link a {
      color: #1976D2;
      text-decoration: none;
      font-weight: 500;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    hidePassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notification: NotificationService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.notification.success('Login successful!');
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.loading = false;
                    this.notification.error(error.error?.message || 'Login failed. Please check your credentials.');
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }
    }
}
