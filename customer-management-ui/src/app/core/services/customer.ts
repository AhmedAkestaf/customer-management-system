import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerRequest} from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) {}

  //GET all customers

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  //GET customer by ID
  getCustomerById(id: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);

  }

  //POST create customer

  createCustomer(customer: CustomerRequest): Observable<Customer>{
    return this.http.post<Customer>(this.apiUrl,customer);
  }


  //PUT update customer

  updateCustomer(id: string, customer: CustomerRequest): Observable<Customer>{
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  // DELETE customer

  deleteCustomer(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
