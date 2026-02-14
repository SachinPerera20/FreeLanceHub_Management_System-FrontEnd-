import { createContext } from 'react';

// Context value type defining what the AppliedJobsContext provides
export type AppliedJobsContextType = {
  appliedJobIds: string[];
  applyToJob: (jobId: string) => void;
  isApplied: (jobId: string) => boolean;
  removeApplication: (jobId: string) => void;
};

// Create the context with undefined as default (will be provided by AppliedJobsProvider)
export const AppliedJobsContext = createContext<AppliedJobsContextType | undefined>(undefined);

