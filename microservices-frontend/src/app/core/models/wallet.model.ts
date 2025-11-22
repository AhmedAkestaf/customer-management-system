export interface Wallet {
  walletId: string;
  customerId: string;
  name: string;
  email: string;
  balance: string;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  balanceAfter: number;
  createdAt: string;
}
