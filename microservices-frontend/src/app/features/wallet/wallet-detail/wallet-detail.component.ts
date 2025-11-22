import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-wallet-detail',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
    <div class="wallet-detail">
      <h1>Wallet Details</h1>
      <mat-card>
        <mat-card-content>
          <p>Wallet details coming soon...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .wallet-detail {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #333;
    }
  `]
})
export class WalletDetailComponent { }
