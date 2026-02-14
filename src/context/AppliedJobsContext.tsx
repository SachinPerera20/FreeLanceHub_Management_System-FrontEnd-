import React, { createContext, useContext, useMemo, useState } from "react";

type AppliedJobsContextType = {
    appliedJobIds: string[];
    applyToJob: (jobId: string) => void;
    isApplied: (jobId: string) => boolean;
    removeApplication: (jobId: string) => void;
  };

  const AppliedJobsContext = createContext<AppliedJobsContextType | undefined>(undefined);

  export function AppliedJobsProvider({ children }: { children: React.ReactNode }) {
    const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
      const stored = localStorage.getItem("appliedJobIds");
      return stored ? JSON.parse(stored) : [];
    });

    const applyToJob = (jobId: string) => {
        setAppliedJobIds(prev => {
          if (prev.includes(jobId)) return prev;
          const updated = [...prev, jobId];
          localStorage.setItem("appliedJobIds", JSON.stringify(updated));
          return updated;
        });
      };

      const removeApplication = (jobId: string) => {
        setAppliedJobIds(prev => {
          const updated = prev.filter(id => id !== jobId);
          localStorage.setItem("appliedJobIds", JSON.stringify(updated));
          return updated;
        });
      };
    
      const isApplied = (jobId: string) => appliedJobIds.includes(jobId);

      const value = useMemo(
        () => ({ appliedJobIds, applyToJob, isApplied, removeApplication }),
        [appliedJobIds]
      );
    
      return (
        <AppliedJobsContext.Provider value={value}>
          {children}
        </AppliedJobsContext.Provider>
      );
    }
    
    export function useAppliedJobs() {
      const ctx = useContext(AppliedJobsContext);
      if (!ctx) throw new Error("useAppliedJobs must be used inside AppliedJobsProvider");
      return ctx;
    }