export interface CustomerEvent {
  id: string;
  customerId: string;
  eventType: string;
  eventData: any;
  timestamp: string;
}

export interface CustomerAnalytics {
  date: string;
  totalCustomers: number;
  newCustomers: number;
  updatedCustomers: number;
  deletedCustomers: number;
}

export interface AnalyticsDashboard {
  totalEvents: number;
  newCustomersToday: number;
  todayAnalytics: CustomerAnalytics | null;
  recentEvents: CustomerEvent[];
}
