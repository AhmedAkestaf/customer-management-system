import { Routes } from '@angular/router';
import { CustomerList } from './features/customers/customer-list/customer-list';

export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerList },
  { path: '**', redirectTo: '/customers' }
];
