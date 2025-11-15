import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Customer } from '../../../core/services/customer';
import { CustomerResponse } from '../../../core/models/customer.model';
import { LoadingSpinner } from '../../../shared/ui/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, RouterModule, LoadingSpinner, EmptyState],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList implements OnInit {
  customers = signal<CustomerResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  constructor(private customerService: Customer) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load customers. Please try again.');
        this.loading.set(false);
        console.error('Error loading customers:', err);
      },
    });
  }

  deleteCustomer(id: string, name: string): void {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers.update(current => current.filter(c => c.id !== id));
          alert('Customer deleted successfully!');
        },
        error: (err) => {
          this.error.set('Failed to delete customer');
          console.error('Error deleting customer:', err);
        },
      });
    }
  }

  filterCustomers(): CustomerResponse[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.customers();

    return this.customers().filter(customer =>
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.address.toLowerCase().includes(term)
    );
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
