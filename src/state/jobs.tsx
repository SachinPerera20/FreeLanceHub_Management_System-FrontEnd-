import React, { useCallback, useState, createContext, useContext } from 'react';
import { Job, CreateJobInput, JobStatus } from '../types';
import { jobsService } from '../services/jobs.service';
import { useAuth } from './auth';
interface JobsState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  isLoading: boolean;
  fetchJobs: () => Promise<void>;
  getJobById: (id: string) => Promise<Job | undefined>;
  fetchJobById: (id: string) => Promise<void>;
  createJob: (input: CreateJobInput) => Promise<Job>;
  updateJobStatus: (jobId: string, status: JobStatus) => Promise<void>;
  toggleFlag: (jobId: string) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
}
const JobsContext = createContext<JobsState | undefined>(undefined);
export function JobsProvider({
  children


}: {children: ReactNode;}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    user
  } = useAuth();
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const data = await jobsService.listJobs();
    setJobs(data);
    setLoading(false);
  }, []);
  const getJobById = useCallback(async (id: string) => jobsService.getJobById(id), []);
  const fetchJobById = useCallback(async (id: string) => {
    setLoading(true);
    const job = await jobsService.getJobById(id);
    setCurrentJob(job || null);
    setLoading(false);
  }, []);
  const createJob = useCallback(async (input: CreateJobInput) => {
    if (!user) throw new Error('Not authenticated');
    const job = await jobsService.createJob(input, user.id, user.name);
    setJobs((prev) => [...prev, job]);
    return job;
  }, [user]);
  const updateJobStatus = useCallback(async (jobId: string, status: JobStatus) => {
    const updated = await jobsService.updateJobStatus(jobId, status);
    setJobs((prev) => prev.map((j) => j.id === updated.id ? updated : j));
    if (currentJob?.id === jobId) setCurrentJob(updated);
  }, [currentJob]);
  const toggleFlag = useCallback(async (jobId: string) => {
    const updated = await jobsService.toggleFlag(jobId);
    setJobs((prev) => prev.map((j) => j.id === updated.id ? updated : j));
    if (currentJob?.id === jobId) setCurrentJob(updated);
  }, [currentJob]);
  const deleteJob = useCallback(async (jobId: string) => {
    await jobsService.deleteJob(jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  }, []);
  return <JobsContext.Provider value={{
    jobs,
    currentJob,
    loading,
    isLoading: loading,
    fetchJobs,
    getJobById,
    fetchJobById,
    createJob,
    updateJobStatus,
    toggleFlag,
    deleteJob
  }}>
      {children}
    </JobsContext.Provider>;
}
export function useJobs(): JobsState {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}