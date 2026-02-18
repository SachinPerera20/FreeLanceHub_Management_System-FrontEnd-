import { Proposal, CreateProposalInput, ProposalStatus } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const proposalsService = {
  async listByJob(jobId: string): Promise<Proposal[]> {
    const all = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    return all.filter((p) => p.jobId === jobId);
  },
  async listAll(): Promise<Proposal[]> {
    return readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
  },
  async listByFreelancer(freelancerId: string): Promise<Proposal[]> {
    const all = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    return all.filter((p) => p.freelancerId === freelancerId);
  },
  async createProposal(
  input: CreateProposalInput,
  freelancerId: string,
  freelancerName: string)
  : Promise<Proposal> {
    const proposals = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    const now = nowISO();
    const proposal: Proposal = {
      id: generateId(),
      jobId: input.jobId,
      freelancerId,
      freelancerName,
      coverLetter: input.coverLetter,
      bidAmount: input.bidAmount,
      estimatedDays: input.estimatedDays,
      status: 'pending',
      submittedAt: now,
      updatedAt: now
    };
    proposals.push(proposal);
    writeStore(STORAGE_KEYS.PROPOSALS, proposals);
    return proposal;
  },
  async updateStatus(
  proposalId: string,
  status: ProposalStatus)
  : Promise<Proposal> {
    const proposals = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    const idx = proposals.findIndex((p) => p.id === proposalId);
    if (idx === -1) throw new Error('Proposal not found');
    proposals[idx].status = status;
    proposals[idx].updatedAt = nowISO();
    writeStore(STORAGE_KEYS.PROPOSALS, proposals);
    return proposals[idx];
  },
  async acceptProposal(proposalId: string): Promise<Proposal> {
    return this.updateStatus(proposalId, 'accepted');
  },
  async rejectProposal(proposalId: string): Promise<Proposal> {
    return this.updateStatus(proposalId, 'rejected');
  },
  async deleteProposal(proposalId: string): Promise<void> {
    let proposals = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    proposals = proposals.filter((p) => p.id !== proposalId);
    writeStore(STORAGE_KEYS.PROPOSALS, proposals);
  }
};