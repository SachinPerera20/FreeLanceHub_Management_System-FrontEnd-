import React, { useCallback, useState, createContext, useContext } from 'react';
import { Payment } from '../types';
import { paymentsService } from '../services/payments.service';
import { contractsService } from '../services/contracts.service';
import { notificationsService } from '../services/notifications.service';
import { useAuth } from './auth';
interface PaymentsState {
  currentPayment: Payment | null;
  loading: boolean;
  isLoading: boolean;
  createAndProcess: (contractId: string, amount: number) => Promise<Payment>;
  processPayment: (contractId: string, amount: number) => Promise<Payment>;
  getPayment: (paymentId: string) => Promise<Payment | undefined>;
  getPaymentById: (paymentId: string) => Promise<Payment | undefined>;
  getPaymentByContract: (contractId: string) => Promise<Payment | undefined>;
}
const PaymentsContext = createContext<PaymentsState | undefined>(undefined);
export function PaymentsProvider({
  children


}: {children: ReactNode;}) {
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const createAndProcess = useCallback(async (contractId: string, amount: number) => {
    if (!user) throw new Error('Not authenticated');
    setLoading(true);
    const payment = await paymentsService.createPayment(contractId, user.id, amount);
    setCurrentPayment(payment);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const result = await paymentsService.simulatePayment(payment.id);
    setCurrentPayment(result);
    await contractsService.updatePaymentStatus(contractId, result.status);
    const contract = await contractsService.getContractById(contractId);
    if (contract) {
      const notifType = result.status === 'paid' ? 'payment_paid' as const : 'payment_failed' as const;
      const notifTitle = result.status === 'paid' ? 'Payment Successful' : 'Payment Failed';
      const notifMsg = result.status === 'paid' ? `Payment of LKR ${amount.toLocaleString()} completed successfully` : `Payment of LKR ${amount.toLocaleString()} failed: ${result.failureReason}`;
      await notificationsService.createNotification(contract.clientId, notifType, notifTitle, notifMsg, result.id);
      await notificationsService.createNotification(contract.freelancerId, notifType, notifTitle, notifMsg, result.id);
    }
    setLoading(false);
    return result;
  }, [user]);
  const getPayment = useCallback(async (paymentId: string) => paymentsService.getPayment(paymentId), []);
  const getPaymentByContract = useCallback(async (contractId: string) => paymentsService.getPaymentByContract(contractId), []);
  return <PaymentsContext.Provider value={{
    currentPayment,
    loading,
    isLoading: loading,
    createAndProcess,
    processPayment: createAndProcess,
    getPayment,
    getPaymentById: getPayment,
    getPaymentByContract
  }}>
      {children}
    </PaymentsContext.Provider>;
}
export function usePayments(): PaymentsState {
  const ctx = useContext(PaymentsContext);
  if (!ctx) throw new Error('usePayments must be used within PaymentsProvider');
  return ctx;
}