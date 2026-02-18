import { Job, CreateJobInput, JobStatus } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const jobsService = {
  async listJobs(): Promise<Job[]> {
    return readStore<Job[]>(STORAGE_KEYS.JOBS, []);
  },
  async getJobById(id: string): Promise<Job | undefined> {
    const jobs = readStore<Job[]>(STORAGE_KEYS.JOBS, []);
    return jobs.find((j) => j.id === id);
  },
  async createJob(
  input: CreateJobInput,
  userId: string,
  userName: string)
  : Promise<Job> {
    const jobs = readStore<Job[]>(STORAGE_KEYS.JOBS, []);
    const now = nowISO();
    const job: Job = {
      id: generateId(),
      ...input,
      createdBy: userId,
      createdByName: userName,
      status: 'open',
      createdAt: now,
      updatedAt: now
    };
    jobs.push(job);
    writeStore(STORAGE_KEYS.JOBS, jobs);
    return job;
  },
  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const jobs = readStore<Job[]>(STORAGE_KEYS.JOBS, []);
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx === -1) throw new Error('Job not found');
    jobs[idx].status = status;
    jobs[idx].updatedAt = nowISO();
    writeStore(STORAGE_KEYS.JOBS, jobs);
    return jobs[idx];
  },
  async toggleFlag(jobId: string): Promise<Job> {
    const jobs = readStore<Job[]>(STORAGE_KEYS.JOBS, []);
    const idx = jobs.findIndex((j) => j.id === jobId);
    if (idx === -1) throw new Error('Job not found');
    jobs[idx].flagged = !jobs[idx].flagged;
    jobs[idx].updatedAt = nowISO();
    writeStore(STORAGE_KEYS.JOBS, jobs);
    return jobs[idx];
  },
  async deleteJob(jobId: string): Promise<void> {
    let jobs = readStore<Job[]>(STORAGE_KEYS.JOBS, []);
    jobs = jobs.filter((j) => j.id !== jobId);
    writeStore(STORAGE_KEYS.JOBS, jobs);
  }
};