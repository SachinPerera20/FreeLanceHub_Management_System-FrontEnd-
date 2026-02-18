import { Proposal, CreateProposalInput, ProposalStatus } from '../types';
import { api } from '../lib/axios';

export const proposalsService = {
  async listByJob(jobId: string): Promise<Proposal[]> {
    const res = await api.get(`/proposals/job/${jobId}`);
    return res.data as Proposal[];
  },

  async listAll(): Promise<Proposal[]> {
    const res = await api.get('/proposals/my-proposals');
    return res.data as Proposal[];
  },

  async listByFreelancer(freelancerId: string): Promise<Proposal[]> {
    const res = await api.get('/proposals/my-proposals');
    return res.data as Proposal[];
  },

  async createProposal(input: CreateProposalInput, freelancerId: string, freelancerName: string): Promise<Proposal> {
    const res = await api.post('/proposals', input);
    return res.data as Proposal;
  },

  async updateStatus(proposalId: string, status: ProposalStatus): Promise<Proposal> {
    const res = await api.put(`/proposals/${proposalId}/status?status=${encodeURIComponent(status)}`);
    return res.data as Proposal;
  },

  async acceptProposal(proposalId: string): Promise<any> {
    const res = await api.post(`/proposals/${proposalId}/accept`);
    return res.data;
  },

  async rejectProposal(proposalId: string): Promise<Proposal> {
    const res = await api.put(`/proposals/${proposalId}/status?status=rejected`);
    return res.data as Proposal;
  },

  async deleteProposal(proposalId: string): Promise<void> {
    await api.delete(`/proposals/${proposalId}`);
  },
};