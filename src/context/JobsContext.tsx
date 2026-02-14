import React, { useCallback, useMemo, useState } from 'react';
import { MOCK_JOBS } from '../mocks/jobs.mock';
import type { MockJob } from '../mocks/jobs.mock';
import { JobsContext } from './jobs.context';
import type { JobsContextValue } from './jobs.context';

export function JobsProvider({ children }: { children: React.ReactNode }) {
  // Initialize jobs state with MOCK_JOBS
  const [jobs, setJobs] = useState<MockJob[]>(MOCK_JOBS);

  // Add a new job to the list (memoized to prevent unnecessary re-renders)
  const addJob = useCallback((job: MockJob) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  }, []);

  // Find a job by its ID (memoized with jobs dependency)
  const getJobById = useCallback(
    (id: string): MockJob | undefined => {
      return jobs.find((job) => job.id === id);
    },
    [jobs]
  );
  const updateJobStatus: JobsContextValue["updateJobStatus"] = (jobId, status) => {
    setJobs((prev) => {
      const updated = prev.map((j) =>
        j.id === jobId ? { ...j, status } : j
      );
  
      // If you already save jobs to localStorage in this file, call that helper here too.
      // Example: saveJobs(updated);
  
      return updated;
    });
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo<JobsContextValue>(
    () => ({
      jobs,
      addJob,
      getJobById,
      updateJobStatus,
    }),
    [jobs, addJob, getJobById]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

