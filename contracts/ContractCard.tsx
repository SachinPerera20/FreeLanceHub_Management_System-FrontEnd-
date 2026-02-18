import React from 'react';
import { Link } from 'react-router-dom';
import { Contract } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Cards';
import { StatusBadge, PaymentBadge } from '../ui/Badges';
import { format } from 'date-fns';
import { DollarSign, Calendar } from 'lucide-react';
interface ContractCardProps {
  contract: Contract;
  role: 'client' | 'freelancer' | 'admin';
}
export function ContractCard({
  contract,
  role
}: ContractCardProps) {
  return <Link to={`/contracts/${contract.id}`}>
      <Card className="h-full hover:border-teal-500/50 transition-all">
        <CardHeader className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={contract.status} />
              <PaymentBadge status={contract.paymentStatus} />
            </div>
            <CardTitle className="text-base">
              Contract #{contract.id.slice(0, 8)}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Agreed Price:</span>
              <span className="text-teal-400 font-bold">
                LKR {contract.agreedPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Started:</span>
              <span>{format(new Date(contract.startedAt), 'MMM d, yyyy')}</span>
            </div>
            {contract.completedAt && <div className="flex justify-between">
                <span>Completed:</span>
                <span>
                  {format(new Date(contract.completedAt), 'MMM d, yyyy')}
                </span>
              </div>}
          </div>
        </CardContent>

        <CardFooter className="text-xs text-gray-500">
          Click to view details & payment
        </CardFooter>
      </Card>
    </Link>;
}