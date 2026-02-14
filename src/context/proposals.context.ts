// src/context/proposals.context.ts

import type { Proposal } from "../types/proposal.types";

export type ProposalsContextValue = {
  proposals: Proposal[];
  addProposal: (data: Omit<Proposal, "id" | "createdAt" | "status">) => void;
  getProposalsByJobId: (jobId: string) => Proposal[];

  updateProposalStatus: (proposalId: string, status: Proposal["status"]) => void;

};
