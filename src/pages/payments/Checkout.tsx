import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContracts } from '../../state/contracts';
import { usePayments } from '../../state/payments';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
export function Checkout() {
  const {
    contractId
  } = useParams<{
    contractId: string;
  }>();
  const navigate = useNavigate();
  const {
    currentContract,
    fetchContractById
  } = useContracts();
  const {
    processPayment,
    isLoading
  } = usePayments();
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    if (contractId) {
      fetchContractById(contractId);
    }
  }, [contractId, fetchContractById]);
  if (!currentContract) return null;
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payment = await processPayment(currentContract.id, currentContract.agreedPrice);
      navigate(`/payments/result/${payment.id}`);
    } catch (error) {
      console.error('Payment failed', error);
      // Error handled in hook/service, but we could show toast here
    }
  };
  return <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Checkout
        </h1>

        <Card className="border-teal-900/30 shadow-2xl shadow-teal-900/10">
          <CardHeader className="border-b border-gray-800 pb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Total to Pay</span>
              <span className="text-2xl font-bold text-white">
                LKR {currentContract.agreedPrice.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Contract #{currentContract.id.slice(0, 8)}
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handlePayment} className="space-y-5">
              <Input label="Cardholder Name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />

              <Input label="Card Number" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                <Input label="CVC" placeholder="123" type="password" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
              </div>

              <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-3 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-300">
                  This is a secure mock payment environment. No real money will
                  be charged. (80% success rate simulation)
                </p>
              </div>

              <Button type="submit" className="w-full h-12 text-lg" isLoading={isLoading}>
                <Lock className="w-4 h-4 mr-2" /> Pay Now
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}