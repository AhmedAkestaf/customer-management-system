// Interface For  the  response backend (GET)
export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

// Interface For the request backend (POST/PUT)
export interface CustomerRequest {
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  registeredDate: string;
}
