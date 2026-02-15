import { useContext } from "react";
import { ProposalsContext } from "../context/ProposalsContext";

export function useProposals() {
  const ctx = useContext(ProposalsContext);
  if (!ctx) {
    throw new Error("useProposals must be used inside ProposalsProvider");
  }
  return ctx;
}


