import { Payment, PaymentStatus } from '../types';
import { api } from '../lib/axios';

export const paymentsService = {
  async createPayment(contractId: string, clientId: string, amount: number): Promise<Payment> {
    const res = await api.post('/payments', { contractId, amount });
    return res.data as Payment;
  },

  async getPayment(paymentId: string): Promise<Payment | undefined> {
    try {
      const res = await api.get(`/payments/${paymentId}`);
      return res.data as Payment;
    } catch {
      return undefined;
    }
  },

  async getPaymentByContract(contractId: string): Promise<Payment | undefined> {
    try {
      const res = await api.get(`/payments/contract/${contractId}`);
      return res.data as Payment;
    } catch {
      return undefined;
    }
  },

  async listByUser(userId: string): Promise<Payment[]> {
    const res = await api.get('/payments/my');
    return res.data as Payment[];
  },

  async updatePaymentStatus(
      paymentId: string,
      status: PaymentStatus,
      failureReason?: string
  ): Promise<Payment> {
    const res = await api.patch(`/payments/${paymentId}/status`, {
      status,
      ...(failureReason && { failureReason }),
    });
    return res.data as Payment;
  },

  async simulatePayment(paymentId: string): Promise<Payment> {
    const res = await api.post(`/payments/${paymentId}/simulate`);
    return res.data as Payment;
  },
};