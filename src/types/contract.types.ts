//Contract status throughout its lifecycle
 
export type ContractStatus = 'pending' | 'active' | 'completed' | 'terminated' | 'disputed';

//Payment status for contract milestones
 
export type PaymentStatus = 'pending' | 'in_progress' | 'completed' | 'failed';


 // Contract between client and freelancer
 
export interface Contract {
  id: string;
  jobId: string;
  proposalId: string;
  clientId: string;
  freelancerId: string;
  clientName?: string;
  freelancerName?: string;
  title: string;
  description: string;
  totalAmount: number;
  status: ContractStatus;
  startDate: string;
  endDate?: string;
  paymentStatus: PaymentStatus;
  milestones?: Milestone[];
  terms?: string;
  createdAt: string;
  updatedAt: string;
}


 // Milestone for tracking contract progress
 
export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  completedAt?: string;
}


 //Data for creating a new contract
 
export interface CreateContractData {
  jobId: string;
  proposalId: string;
  title: string;
  description: string;
  totalAmount: number;
  startDate: string;
  endDate?: string;
  terms?: string;
  milestones?: Omit<Milestone, 'id' | 'status' | 'completedAt'>[];
}


 //Data for updating an existing contract
 
export interface UpdateContractData {
  status?: ContractStatus;
  paymentStatus?: PaymentStatus;
  endDate?: string;
  terms?: string;
  milestones?: Milestone[];
}

