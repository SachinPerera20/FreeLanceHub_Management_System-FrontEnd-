import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button, Input } from '../ui/FormControls';
import { CreditCard, Lock } from 'lucide-react';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => Promise<void>;
}
export function PaymentModal({
  isOpen,
  onClose,
  amount,
  onConfirm
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  // Fake form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await onConfirm();
    setIsLoading(false);
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Secure Payment">
      <div className="mb-6 text-center">
        <p className="text-gray-400 text-sm">Total Amount</p>
        <p className="text-3xl font-bold text-teal-400">
          LKR {amount.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Card Number" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Expiry Date" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          <Input label="CVC" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} required type="password" />
        </div>

        <div className="flex items-center justify-center text-xs text-gray-500 gap-1 my-4">
          <Lock className="w-3 h-3" />
          <span>
            Payments are secure and encrypted. This is a mock payment.
          </span>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Pay LKR {amount.toLocaleString()}
        </Button>
      </form>
    </Modal>;
}