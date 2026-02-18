import React, { useEffect } from 'react';
import { useContracts } from '../../state/contracts';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import { ContractCard } from '../../components/contracts/ContractCard';
export function Contracts() {
  const {
    contracts,
    fetchContracts,
    isLoading
  } = useContracts();
  const {
    user
  } = useAuth();
  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">My Contracts</h1>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : contracts.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => <ContractCard key={contract.id} contract={contract} role={user?.role || 'client'} />)}
        </div> : <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <h3 className="text-xl font-medium text-gray-300">
            No active contracts
          </h3>
          <p className="text-gray-500 mt-2">
            Contracts are created when a proposal is accepted.
          </p>
        </div>}
    </Layout>;
}