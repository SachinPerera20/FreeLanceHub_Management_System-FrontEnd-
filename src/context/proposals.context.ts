import type { Proposal } from "../types/proposal.types";

export type NewProposalInput = Omit<Proposal, "id" | "status" | "createdAt">;

export type ProposalsContextValue = {
  proposals: Proposal[];
  addProposal: (data: NewProposalInput) => void;
  getProposalsByJobId: (jobId: string) => Proposal[];
  updateProposalStatus: (proposalId: string, status: Proposal["status"]) => void;
};
