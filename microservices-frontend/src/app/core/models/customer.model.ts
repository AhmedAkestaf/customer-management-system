export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  country?: string;
  city?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
  address?: string;
  country?: string;
  city?: string;
  dateOfBirth?: string;
  registeredDate?: string;
}
