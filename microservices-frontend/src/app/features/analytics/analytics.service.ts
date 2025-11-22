import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnalyticsDashboard, CustomerEvent, CustomerAnalytics } from '../../core/models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/api/analytics`;

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<AnalyticsDashboard> {
    return this.http.get<AnalyticsDashboard>(`${this.apiUrl}/dashboard`);
  }

  getTotalEvents(): Observable<{ totalEvents: number }> {
    return this.http.get<{ totalEvents: number }>(`${this.apiUrl}/events/count`);
  }

  getNewCustomersToday(): Observable<{ newCustomersToday: number; date: number }> {
    return this.http.get<{ newCustomersToday: number; date: number }>(`${this.apiUrl}/customers/today`);
  }

  getRecentEvents(): Observable<CustomerEvent[]> {
    return this.http.get<CustomerEvent[]>(`${this.apiUrl}/events/recent`);
  }

  getTodayAnalytics(): Observable<CustomerAnalytics> {
    return this.http.get<CustomerAnalytics>(`${this.apiUrl}/daily/today`);
  }

  getAnalyticsRange(start: string, end: string): Observable<CustomerAnalytics[]> {
    return this.http.get<CustomerAnalytics[]>(`${this.apiUrl}/range?start=${start}&end=${end}`);
  }
}
