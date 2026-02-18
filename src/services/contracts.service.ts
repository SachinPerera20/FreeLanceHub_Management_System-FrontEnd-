import { Contract, ContractStatus, PaymentStatus } from '../types';
import { api } from '../lib/axios';

export const contractsService = {
  async listContracts(): Promise<Contract[]> {
    const res = await api.get('/contracts/my');
    return res.data as Contract[];
  },

  async getContractById(id: string): Promise<Contract | undefined> {
    try {
      const res = await api.get(`/contracts/${id}`);
      return res.data as Contract;
    } catch {
      return undefined;
    }
  },

  async createFromAcceptedProposal(
      jobId: string,
      proposalId: string,
      clientId: string,
      freelancerId: string,
      agreedPrice: number
  ): Promise<Contract> {
    // Contract is created server-side when proposal is accepted.
    // This function is kept so the state file doesn't break — it
    // calls the same accept endpoint which returns the new contract.
    const res = await api.post(`/proposals/${proposalId}/accept`);
    return res.data as Contract;
  },

  async updateStatus(contractId: string, status: ContractStatus): Promise<Contract> {
    const res = await api.patch(`/contracts/${contractId}/status?status=${status}`);
    return res.data as Contract;
  },

  async completeContract(contractId: string): Promise<Contract> {
    return this.updateStatus(contractId, 'completed');
  },

  async updatePaymentStatus(contractId: string, paymentStatus: PaymentStatus): Promise<Contract> {
    const res = await api.patch(`/contracts/${contractId}/payment-status?paymentStatus=${paymentStatus}`);
    return res.data as Contract;
  },
};