import { Payment, PaymentStatus } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const paymentsService = {
  async createPayment(
  contractId: string,
  clientId: string,
  amount: number)
  : Promise<Payment> {
    const payments = readStore<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    const now = nowISO();
    const payment: Payment = {
      id: generateId(),
      contractId,
      clientId,
      amount,
      currency: 'LKR',
      provider: 'dummy_stripe',
      status: 'processing',
      createdAt: now,
      updatedAt: now
    };
    payments.push(payment);
    writeStore(STORAGE_KEYS.PAYMENTS, payments);
    return payment;
  },
  async getPayment(paymentId: string): Promise<Payment | undefined> {
    const all = readStore<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    return all.find((p) => p.id === paymentId);
  },
  async getPaymentByContract(contractId: string): Promise<Payment | undefined> {
    const all = readStore<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    return all.find((p) => p.contractId === contractId);
  },
  async listByUser(userId: string): Promise<Payment[]> {
    const all = readStore<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    return all.filter((p) => p.clientId === userId);
  },
  async updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  failureReason?: string)
  : Promise<Payment> {
    const payments = readStore<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    const idx = payments.findIndex((p) => p.id === paymentId);
    if (idx === -1) throw new Error('Payment not found');
    payments[idx].status = status;
    payments[idx].updatedAt = nowISO();
    if (status === 'paid')
    payments[idx].receiptUrl = `#receipt-${payments[idx].id}`;
    if (failureReason) payments[idx].failureReason = failureReason;
    writeStore(STORAGE_KEYS.PAYMENTS, payments);
    return payments[idx];
  },
  async simulatePayment(paymentId: string): Promise<Payment> {
    const success = Math.random() < 0.8;
    if (success) return this.updatePaymentStatus(paymentId, 'paid');else

    return this.updatePaymentStatus(
      paymentId,
      'failed',
      'Card declined (mock)'
    );
  }
};