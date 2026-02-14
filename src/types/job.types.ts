
//Job status lifecycle
 
export type JobStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';

 //Payment type for the job
 
export type PaymentType = 'fixed' | 'hourly';


 // Experience level required 
 
export type ExperienceLevel = 'entry' | 'intermediate' | 'expert';


 // Job posting in the freelance platform
 
export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName?: string;
  clientAvatar?: string;
  skills: string[];
  budget: number;
  paymentType: PaymentType;
  experienceLevel: ExperienceLevel;
  status: JobStatus;
  proposalsCount?: number;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  createdBy: string;
}


 //Data for creating a new job
 
export interface CreateJobData {
  title: string;
  description: string;
  skills: string[];
  budget: number;
  paymentType: PaymentType;
  experienceLevel: ExperienceLevel;
  deadline?: string;
}


 // Data for updating an existing job
 
export interface UpdateJobData {
  title?: string;
  description?: string;
  skills?: string[];
  budget?: number;
  paymentType?: PaymentType;
  experienceLevel?: ExperienceLevel;
  status?: JobStatus;
  deadline?: string;
}

