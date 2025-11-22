import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-wallet-list',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
    <div class="wallet-list">
      <h1>Wallets</h1>
      <mat-card>
        <mat-card-content>
          <p>Wallet list coming soon...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .wallet-list {
      max-width: 1400px;
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
export class WalletListComponent { }
