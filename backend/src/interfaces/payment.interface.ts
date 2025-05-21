export interface InitialPaymentRequests {
  email: string;
  amount: number;
  name?: string;
}

export interface PaymentStatusResponse {
  status: string;
  reference: string;
  amount: number;
  gateway_response: string;
  paid_at: string | null;
}
