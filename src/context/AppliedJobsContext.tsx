import React, { useCallback, useMemo, useState } from 'react';
import { AppliedJobsContext } from './appliedJobs.context';
import type { AppliedJobsContextType } from './appliedJobs.context';

export function AppliedJobsProvider({ children }: { children: React.ReactNode }) {
  // Initialize applied job IDs from localStorage
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('appliedJobIds');
    return stored ? JSON.parse(stored) : [];
  });

  // Add a job to the applied list
  const applyToJob = useCallback((jobId: string) => {
    setAppliedJobIds((prev) => {
      if (prev.includes(jobId)) return prev;
      const updated = [...prev, jobId];
      localStorage.setItem('appliedJobIds', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Remove a job from the applied list
  const removeApplication = useCallback((jobId: string) => {
    setAppliedJobIds((prev) => {
      const updated = prev.filter((id) => id !== jobId);
      localStorage.setItem('appliedJobIds', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if a job is already applied
  const isApplied = useCallback(
    (jobId: string) => appliedJobIds.includes(jobId),
    [appliedJobIds]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<AppliedJobsContextType>(
    () => ({ appliedJobIds, applyToJob, isApplied, removeApplication }),
    [appliedJobIds, applyToJob, isApplied, removeApplication]
  );

  return (
    <AppliedJobsContext.Provider value={value}>
      {children}
    </AppliedJobsContext.Provider>
  );
}
