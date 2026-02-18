// ============================================================
// UniFreelancer — Strict Types
// ============================================================

// ---- Roles & Categories ----
export type UserRole = 'CLIENT' | 'FREELANCER' | 'ADMIN' | 'PENDING';

export type ServiceCategory =
'Assignment Help' |
'Project Support' |
'Tutoring' |
'Notes' |
'Design/Slides' |
'Other';

// ---- User ----
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  bio?: string;
  createdAt: string;
  updatedAt: string;

  // New Performance Stats
  totalReviews?: number;
  averageRating?: number;
  ratingBreakdown?: Record<number, number>; // { 5: 10, 4: 2 ... }
  totalCompletedProjects?: number;
  completionRate?: number; // 0-100
  totalProposals?: number;
  activeContracts?: number;
}

export type SafeUser = Omit<User, 'password'>;

// ---- Auth ----
export interface AuthPayload {
  user: SafeUser;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// ---- Jobs ----
export type JobStatus = 'open' | 'in_progress' | 'completed';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: ServiceCategory;
  skills: string[];
  createdBy: string;
  createdByName?: string;
  status: JobStatus;
  flagged?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  budget: number;
  category: ServiceCategory;
  skills: string[];
}

// ---- Proposals ----
export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDays: number;
  status: ProposalStatus;
  submittedAt: string;
  updatedAt: string;
}

export interface CreateProposalInput {
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDays: number;
}

// ---- Contracts ----
export type ContractStatus = 'active' | 'completed' | 'cancelled';

export interface Contract {
  id: string;
  jobId: string;
  proposalId: string;
  clientId: string;
  freelancerId: string;
  agreedPrice: number;
  status: ContractStatus;
  startedAt: string;
  completedAt?: string;
  paymentStatus?: PaymentStatus;
}

// ---- Reviews ----
export interface Review {
  id: string;
  contractId: string;
  freelancerId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5
  comment: string;
  tags?: string[];
  createdAt: string;
}

export interface CreateReviewInput {
  contractId: string;
  freelancerId: string;
  rating: number;
  comment: string;
  tags?: string[];
}

// ---- Payments ----
export type PaymentStatus =
'unpaid' |
'processing' |
'paid' |
'failed' |
'refunded';

export interface Payment {
  id: string;
  contractId: string;
  clientId: string;
  amount: number;
  currency: 'LKR' | 'USD';
  provider: 'dummy_stripe';
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  receiptUrl?: string;
  failureReason?: string;
}

// ---- Notifications ----
export type NotificationType =
'proposal_submitted' |
'proposal_accepted' |
'proposal_rejected' |
'contract_created' |
'message_received' |
'job_status_changed' |
'payment_paid' |
'payment_failed' |
'review_received';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId: string;
  isRead: boolean;
  createdAt: string;
}

// ---- Chat ----
export interface ChatThread {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  createdAt: string;
  lastMessageAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  text: string;
  createdAt: string;
  readBy: string[];
}