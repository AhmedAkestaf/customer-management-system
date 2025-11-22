import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  template: `
    <div class="settings">
      <h1>Settings</h1>

      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Application Preferences</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="settings-section">
            <h3>Appearance</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label>Dark Mode</label>
                <p>Enable dark theme for the application</p>
              </div>
              <mat-slide-toggle [(ngModel)]="darkMode" (change)="onDarkModeChange()"></mat-slide-toggle>
            </div>
          </div>

          <div class="settings-section">
            <h3>Notifications</h3>
            <div class="setting-item">
              <div class="setting-info">
                <label>Email Notifications</label>
                <p>Receive email notifications for important events</p>
              </div>
              <mat-slide-toggle [(ngModel)]="emailNotifications"></mat-slide-toggle>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <label>Desktop Notifications</label>
                <p>Show desktop notifications</p>
              </div>
              <mat-slide-toggle [(ngModel)]="desktopNotifications"></mat-slide-toggle>
            </div>
          </div>

          <div class="settings-section">
            <h3>Localization</h3>
            <mat-form-field appearance="outline" class="language-select">
              <mat-label>Language</mat-label>
              <mat-select [(ngModel)]="selectedLanguage">
                <mat-option value="en">English</mat-option>
                <mat-option value="fr">Français</mat-option>
                <mat-option value="es">Español</mat-option>
                <mat-option value="de">Deutsch</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <p class="settings-note">
        <strong>Note:</strong> These settings are stored locally in your browser.
      </p>
    </div>
  `,
  styles: [`
    .settings {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }

    .settings-card {
      margin-top: 16px;
    }

    mat-card-title {
      font-size: 20px;
      font-weight: 600;
    }

    .settings-section {
      margin: 24px 0;
      padding-bottom: 24px;
      border-bottom: 1px solid #e0e0e0;
    }

    .settings-section:last-child {
      border-bottom: none;
    }

    .settings-section h3 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
    }

    .setting-info {
      flex: 1;
    }

    .setting-info label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }

    .setting-info p {
      margin: 0;
      font-size: 12px;
      color: #666;
    }

    .language-select {
      width: 100%;
      max-width: 300px;
    }

    .settings-note {
      margin-top: 24px;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class SettingsComponent {
  darkMode = false;
  emailNotifications = true;
  desktopNotifications = false;
  selectedLanguage = 'en';

  constructor() {
    this.loadSettings();
    this.applyDarkMode();
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.darkMode = settings.darkMode || false;
      this.emailNotifications = settings.emailNotifications !== false;
      this.desktopNotifications = settings.desktopNotifications || false;
      this.selectedLanguage = settings.language || 'en';
    }
  }

  saveSettings(): void {
    const settings = {
      darkMode: this.darkMode,
      emailNotifications: this.emailNotifications,
      desktopNotifications: this.desktopNotifications,
      language: this.selectedLanguage
    };
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }

  onDarkModeChange(): void {
    this.saveSettings();
    this.applyDarkMode();
  }

  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
