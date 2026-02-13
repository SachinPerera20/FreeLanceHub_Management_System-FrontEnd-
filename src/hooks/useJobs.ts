import { useContext } from 'react';
import { JobsContext } from '../context/jobs.context';

export function useJobs() {
    const ctx = useContext(JobsContext);
  
    if (!ctx) {
      throw new Error('useJobs must be used within a JobsProvider');
    }
  
    return ctx;
  }