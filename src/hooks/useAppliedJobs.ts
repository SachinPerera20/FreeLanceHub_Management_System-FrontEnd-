import { useContext } from 'react';
import { AppliedJobsContext } from '../context/appliedJobs.context';

export function useAppliedJobs() {
  const ctx = useContext(AppliedJobsContext);
  if (!ctx) {
    throw new Error("useAppliedJobs must be used inside AppliedJobsProvider");
  }
  return ctx;
}
