import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
    selector: 'app-register',
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
        MatIconModule,
        MatCheckboxModule
    ],
    template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>
            <h1>Create Account</h1>
            <p>Sign up to get started</p>
          </mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput type="text" formControlName="name" placeholder="Enter your full name">
              <mat-icon matPrefix>person</mat-icon>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('name')?.hasError('minlength')">
                Name must be at least 3 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="Enter your email">
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
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
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm Password</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" 
                     formControlName="confirmPassword" placeholder="Confirm your password">
              <mat-icon matPrefix>lock</mat-icon>
              <button mat-icon-button matSuffix type="button" (click)="hideConfirmPassword = !hideConfirmPassword">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                Please confirm your password
              </mat-error>
              <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">
                Passwords do not match
              </mat-error>
            </mat-form-field>

            <div class="password-strength" *ngIf="registerForm.get('password')?.value">
              <div class="strength-bar" [class]="getPasswordStrength()"></div>
              <span class="strength-text">{{ getPasswordStrengthText() }}</span>
            </div>

            <mat-checkbox formControlName="acceptTerms" class="terms-checkbox">
              I accept the <a href="#" (click)="$event.preventDefault()">Terms and Conditions</a>
            </mat-checkbox>

            <button mat-raised-button color="primary" type="submit" 
                    class="full-width submit-btn" [disabled]="registerForm.invalid || loading">
              <span *ngIf="!loading">Create Account</span>
              <mat-spinner *ngIf="loading" diameter="20"></mat-spinner>
            </button>
          </form>

          <div class="login-link">
            <p>Already have an account? <a routerLink="/auth/login">Sign in</a></p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .register-card {
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

    .password-strength {
      margin-bottom: 16px;
    }

    .strength-bar {
      height: 4px;
      border-radius: 2px;
      transition: all 0.3s;
    }

    .strength-bar.weak {
      width: 33%;
      background-color: #f44336;
    }

    .strength-bar.medium {
      width: 66%;
      background-color: #ff9800;
    }

    .strength-bar.strong {
      width: 100%;
      background-color: #4caf50;
    }

    .strength-text {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
      display: block;
    }

    .terms-checkbox {
      margin-bottom: 20px;
    }

    .terms-checkbox a {
      color: #1976D2;
      text-decoration: none;
    }

    .submit-btn {
      height: 48px;
      font-size: 16px;
      font-weight: 500;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
    }

    .login-link p {
      color: #666;
      font-size: 14px;
    }

    .login-link a {
      color: #1976D2;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    mat-spinner {
      margin: 0 auto;
    }
  `]
})
export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;
    hidePassword = true;
    hideConfirmPassword = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notification: NotificationService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
            acceptTerms: [false, [Validators.requiredTrue]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (!password || !confirmPassword) {
            return null;
        }

        if (confirmPassword.value === '') {
            return null;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            const errors = confirmPassword.errors;
            if (errors) {
                delete errors['passwordMismatch'];
                if (Object.keys(errors).length === 0) {
                    confirmPassword.setErrors(null);
                }
            }
            return null;
        }
    }

    getPasswordStrength(): string {
        const password = this.registerForm.get('password')?.value || '';
        if (password.length < 6) return 'weak';
        if (password.length < 10) return 'medium';
        return 'strong';
    }

    getPasswordStrengthText(): string {
        const strength = this.getPasswordStrength();
        return `Password strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.loading = true;
            const { confirmPassword, acceptTerms, ...registerData } = this.registerForm.value;

            this.authService.register(registerData).subscribe({
                next: () => {
                    this.notification.success('Registration successful! Redirecting to dashboard...');
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1000);
                },
                error: (error) => {
                    this.loading = false;
                    this.notification.error(error.error?.message || 'Registration failed. Please try again.');
                },
                complete: () => {
                    this.loading = false;
                }
            });
        }
    }
}
