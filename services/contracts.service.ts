import { Contract, ContractStatus, PaymentStatus } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const contractsService = {
  async listContracts(): Promise<Contract[]> {
    return readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
  },
  async getContractById(id: string): Promise<Contract | undefined> {
    const all = readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
    return all.find((c) => c.id === id);
  },
  async createFromAcceptedProposal(
  jobId: string,
  proposalId: string,
  clientId: string,
  freelancerId: string,
  agreedPrice: number)
  : Promise<Contract> {
    const contracts = readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
    const contract: Contract = {
      id: generateId(),
      jobId,
      proposalId,
      clientId,
      freelancerId,
      agreedPrice,
      status: 'active',
      startedAt: nowISO(),
      paymentStatus: 'unpaid'
    };
    contracts.push(contract);
    writeStore(STORAGE_KEYS.CONTRACTS, contracts);
    return contract;
  },
  async updateStatus(
  contractId: string,
  status: ContractStatus)
  : Promise<Contract> {
    const contracts = readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
    const idx = contracts.findIndex((c) => c.id === contractId);
    if (idx === -1) throw new Error('Contract not found');
    contracts[idx].status = status;
    if (status === 'completed') contracts[idx].completedAt = nowISO();
    writeStore(STORAGE_KEYS.CONTRACTS, contracts);
    return contracts[idx];
  },
  async completeContract(contractId: string): Promise<Contract> {
    return this.updateStatus(contractId, 'completed');
  },
  async updatePaymentStatus(
  contractId: string,
  paymentStatus: PaymentStatus)
  : Promise<Contract> {
    const contracts = readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
    const idx = contracts.findIndex((c) => c.id === contractId);
    if (idx === -1) throw new Error('Contract not found');
    contracts[idx].paymentStatus = paymentStatus;
    writeStore(STORAGE_KEYS.CONTRACTS, contracts);
    return contracts[idx];
  }
};