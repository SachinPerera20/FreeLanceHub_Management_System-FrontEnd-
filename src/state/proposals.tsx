import React, { useCallback, useState, createContext, useContext } from 'react';
import { Proposal, CreateProposalInput } from '../types';
import { proposalsService } from '../services/proposals.service';
import { jobsService } from '../services/jobs.service';
import { contractsService } from '../services/contracts.service';
import { chatService } from '../services/chat.service';
import { notificationsService } from '../services/notifications.service';
import { useAuth } from './auth';
interface ProposalsState {
  proposals: Proposal[];
  loading: boolean;
  isLoading: boolean;
  fetchByJob: (jobId: string) => Promise<void>;
  fetchProposalsByJob: (jobId: string) => Promise<void>;
  fetchAll: () => Promise<void>;
  fetchByFreelancer: () => Promise<void>;
  createProposal: (input: CreateProposalInput) => Promise<Proposal>;
  acceptProposal: (proposalOrId: Proposal | string) => Promise<void>;
  rejectProposal: (proposalIdOrObj: string, freelancerId?: string) => Promise<void>;
  deleteProposal: (proposalId: string) => Promise<void>;
}
const ProposalsContext = createContext<ProposalsState | undefined>(undefined);
export function ProposalsProvider({
  children


}: {children: ReactNode;}) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const fetchByJob = useCallback(async (jobId: string) => {
    setLoading(true);
    setProposals(await proposalsService.listByJob(jobId));
    setLoading(false);
  }, []);
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setProposals(await proposalsService.listAll());
    setLoading(false);
  }, []);
  const fetchByFreelancer = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setProposals(await proposalsService.listByFreelancer(user.id));
    setLoading(false);
  }, [user]);
  const createProposal = useCallback(async (input: CreateProposalInput) => {
    if (!user) throw new Error('Not authenticated');
    const proposal = await proposalsService.createProposal(input, user.id, user.name);
    setProposals((prev) => [...prev, proposal]);
    const job = await jobsService.getJobById(input.jobId);
    if (job) await notificationsService.createNotification(job.createdBy, 'proposal_submitted', 'New Proposal', `${user.name} submitted a proposal for "${job.title}"`, job.id);
    return proposal;
  }, [user]);
  const acceptProposal = useCallback(async (proposalOrId: Proposal | string) => {
    if (!user) throw new Error('Not authenticated');
    let proposal: Proposal;
    if (typeof proposalOrId === 'string') {
      const found = proposals.find((p) => p.id === proposalOrId);
      if (!found) throw new Error('Proposal not found');
      proposal = found;
    } else {
      proposal = proposalOrId;
    }
    await proposalsService.acceptProposal(proposal.id);
    const allForJob = await proposalsService.listByJob(proposal.jobId);
    for (const p of allForJob) {
      if (p.id !== proposal.id && p.status === 'pending') {
        await proposalsService.rejectProposal(p.id);
        await notificationsService.createNotification(p.freelancerId, 'proposal_rejected', 'Proposal Not Selected', 'Your proposal for this job was not selected', p.jobId);
      }
    }
    await jobsService.updateJobStatus(proposal.jobId, 'in_progress');
    const contract = await contractsService.createFromAcceptedProposal(proposal.jobId, proposal.id, user.id, proposal.freelancerId, proposal.bidAmount);
    await chatService.createThread(proposal.jobId, user.id, proposal.freelancerId);
    await notificationsService.createNotification(proposal.freelancerId, 'proposal_accepted', 'Proposal Accepted!', 'Your proposal has been accepted', proposal.jobId);
    const job = await jobsService.getJobById(proposal.jobId);
    const jobTitle = job?.title || 'a job';
    await notificationsService.createNotification(user.id, 'contract_created', 'Contract Created', `Contract created for "${jobTitle}"`, contract.id);
    await notificationsService.createNotification(proposal.freelancerId, 'contract_created', 'Contract Created', `Contract created for "${jobTitle}"`, contract.id);
    setProposals(await proposalsService.listByJob(proposal.jobId));
  }, [user, proposals]);
  const rejectProposal = useCallback(async (proposalIdOrObj: string, freelancerId?: string) => {
    let actualFreelancerId = freelancerId;
    if (!actualFreelancerId) {
      const found = proposals.find((p) => p.id === proposalIdOrObj);
      if (found) actualFreelancerId = found.freelancerId;
    }
    await proposalsService.rejectProposal(proposalIdOrObj);
    if (actualFreelancerId) await notificationsService.createNotification(actualFreelancerId, 'proposal_rejected', 'Proposal Rejected', 'Your proposal was not selected', proposalIdOrObj);
    setProposals((prev) => prev.map((p) => p.id === proposalIdOrObj ? {
      ...p,
      status: 'rejected' as const
    } : p));
  }, [proposals]);
  const deleteProposal = useCallback(async (proposalId: string) => {
    await proposalsService.deleteProposal(proposalId);
    setProposals((prev) => prev.filter((p) => p.id !== proposalId));
  }, []);
  return <ProposalsContext.Provider value={{
    proposals,
    loading,
    isLoading: loading,
    fetchByJob,
    fetchProposalsByJob: fetchByJob,
    fetchAll,
    fetchByFreelancer,
    createProposal,
    acceptProposal,
    rejectProposal,
    deleteProposal
  }}>
      {children}
    </ProposalsContext.Provider>;
}
export function useProposals(): ProposalsState {
  const ctx = useContext(ProposalsContext);
  if (!ctx) throw new Error('useProposals must be used within ProposalsProvider');
  return ctx;
}