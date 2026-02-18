import React, { useCallback, useState, createContext, useContext } from 'react';
import { Contract } from '../types';
import { contractsService } from '../services/contracts.service';
import { jobsService } from '../services/jobs.service';
import { notificationsService } from '../services/notifications.service';
import { useAuth } from './auth';
interface ContractsState {
  contracts: Contract[];
  currentContract: Contract | null;
  loading: boolean;
  isLoading: boolean;
  fetchContracts: () => Promise<void>;
  getContractById: (id: string) => Promise<Contract | undefined>;
  fetchContractById: (id: string) => Promise<void>;
  completeContract: (contractId: string) => Promise<void>;
}
const ContractsContext = createContext<ContractsState | undefined>(undefined);
export function ContractsProvider({
  children


}: {children: ReactNode;}) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [currentContract, setCurrentContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const fetchContracts = useCallback(async () => {
    setLoading(true);
    const all = await contractsService.listContracts();
    if (user && user.role !== 'admin') setContracts(all.filter((c) => c.clientId === user.id || c.freelancerId === user.id));else setContracts(all);
    setLoading(false);
  }, [user]);
  const getContractById = useCallback(async (id: string) => contractsService.getContractById(id), []);
  const fetchContractById = useCallback(async (id: string) => {
    setLoading(true);
    const contract = await contractsService.getContractById(id);
    setCurrentContract(contract || null);
    setLoading(false);
  }, []);
  const completeContract = useCallback(async (contractId: string) => {
    const contract = await contractsService.completeContract(contractId);
    await jobsService.updateJobStatus(contract.jobId, 'completed');
    const job = await jobsService.getJobById(contract.jobId);
    const title = job?.title || 'a job';
    await notificationsService.createNotification(contract.clientId, 'job_status_changed', 'Contract Completed', `Contract for "${title}" has been completed`, contractId);
    await notificationsService.createNotification(contract.freelancerId, 'job_status_changed', 'Contract Completed', `Contract for "${title}" has been completed`, contractId);
    const updated = {
      ...contract,
      status: 'completed' as const,
      completedAt: new Date().toISOString()
    };
    setContracts((prev) => prev.map((c) => c.id === contractId ? updated : c));
    setCurrentContract(updated);
  }, []);
  return <ContractsContext.Provider value={{
    contracts,
    currentContract,
    loading,
    isLoading: loading,
    fetchContracts,
    getContractById,
    fetchContractById,
    completeContract
  }}>
      {children}
    </ContractsContext.Provider>;
}
export function useContracts(): ContractsState {
  const ctx = useContext(ContractsContext);
  if (!ctx) throw new Error('useContracts must be used within ContractsProvider');
  return ctx;
}