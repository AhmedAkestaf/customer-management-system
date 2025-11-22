import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Wallet, Transaction } from '../../core/models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = `${environment.apiUrl}/api/wallets`;

  constructor(private http: HttpClient) { }

  getWallets(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getWallet(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.apiUrl}/${id}`);
  }

  getWalletByCustomerId(customerId: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.apiUrl}/api/customers/${customerId}/wallet`);
  }

  getBalance(walletId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${walletId}/balance`);
  }

  getTransactions(walletId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${walletId}/transactions`);
  }

  updateWalletStatus(walletId: string, status: string): Observable<Wallet> {
    return this.http.patch<Wallet>(`${this.apiUrl}/${walletId}/status`, { status });
  }
}
