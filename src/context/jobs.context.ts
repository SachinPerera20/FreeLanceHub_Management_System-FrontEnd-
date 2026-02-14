import { createContext } from 'react';
import type { MockJob } from '../mocks/jobs.mock';

// Context value type defining what the JobsContext provides
export type JobsContextValue = {
  jobs: MockJob[];
  addJob: (job: MockJob) => void;
  getJobById: (id: string) => MockJob | undefined;

  updateJobStatus: (
    jobId: string,
    status: MockJob["status"]
  ) => void;
};

// Create the context with undefined as default (will be provided by JobsProvider)
export const JobsContext = createContext<JobsContextValue | undefined>(undefined);

