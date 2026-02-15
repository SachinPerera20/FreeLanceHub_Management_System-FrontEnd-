import type { Proposal } from "../types/proposal.types";

export type CreateProposalInput = {
  jobId: string;
  coverLetter: string;
  proposedBudget: number;
  estimatedDays: number;
};

export type ProposalsContextValue = {
  proposals: Proposal[];
  addProposal: (data: CreateProposalInput) => void;
  getProposalsByJobId: (jobId: string) => Proposal[];
  updateProposalStatus: (proposalId: string, status: Proposal["status"]) => void;
};
