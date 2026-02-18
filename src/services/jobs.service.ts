import { Job, CreateJobInput, JobStatus } from '../types';
import { api } from '../lib/axios';

export const jobsService = {
  async listJobs(): Promise<Job[]> {
    const res = await api.get('/jobs');
    return res.data as Job[];
  },

  async getJobById(id: string): Promise<Job | undefined> {
    try {
      const res = await api.get(`/jobs/${id}`);
      console.log('getJobById response:', res.data); // 👈 add this
      return res.data as Job;
    } catch (err) {
      console.error('getJobById failed:', err); // 👈 and this
      return undefined;
    }
  },

  async createJob(input: CreateJobInput, userId: string, userName: string): Promise<Job> {
    const res = await api.post('/jobs', input);
    return res.data as Job;
  },

  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const res = await api.patch(`/jobs/${jobId}/status?status=${status}`);
    return res.data as Job;
  },

  async toggleFlag(jobId: string): Promise<Job> {
    const res = await api.patch(`/jobs/${jobId}/flag`);
    return res.data as Job;
  },

  async deleteJob(jobId: string): Promise<void> {
    await api.delete(`/jobs/${jobId}`);
  },

  async getMyJobs(): Promise<Job[]> {
    const res = await api.get('/jobs/my-jobs');
    return res.data as Job[];
  },
};