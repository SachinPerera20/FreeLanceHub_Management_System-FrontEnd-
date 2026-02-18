import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePayments } from '../../state/payments';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Payment } from '../../types';
export function Result() {
  const {
    paymentId
  } = useParams<{
    paymentId: string;
  }>();
  const {
    getPaymentById
  } = usePayments();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      if (paymentId) {
        const p = await getPaymentById(paymentId);
        setPayment(p);
        setLoading(false);
      }
    };
    load();
  }, [paymentId, getPaymentById]);
  if (loading) return <Layout>
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>;
  if (!payment) return <Layout>Payment not found</Layout>;
  const isSuccess = payment.status === 'paid';
  return <Layout>
      <div className="max-w-md mx-auto py-12">
        <Card className="text-center p-8">
          <div className="flex justify-center mb-6">
            {isSuccess ? <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle className="w-10 h-10" />
              </div> : <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center text-red-500">
                <XCircle className="w-10 h-10" />
              </div>}
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>

          <p className="text-gray-400 mb-8">
            {isSuccess ? `Successfully paid LKR ${payment.amount.toLocaleString()}` : payment.failureReason || 'Something went wrong.'}
          </p>

          <div className="space-y-3">
            <Link to={`/contracts/${payment.contractId}`}>
              <Button className="w-full">
                Return to Contract <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" className="w-full">
                Go Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </Layout>;
}