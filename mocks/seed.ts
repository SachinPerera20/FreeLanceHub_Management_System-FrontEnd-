import {
  User,
  Job,
  Proposal,
  Contract,
  ChatThread,
  Message,
  Notification,
  Payment,
  Review } from
'../types';
import { STORAGE_KEYS, writeStore, readStore } from '../lib/storage';

export function seedIfNeeded(): void {
  if (readStore<boolean>(STORAGE_KEYS.SEEDED, false)) return;
  const now = new Date();
  const d = (daysAgo: number) =>
  new Date(now.getTime() - daysAgo * 86400000).toISOString();

  // Seed Reviews first to calculate stats
  const reviews: Review[] = [
  {
    id: 'r1',
    contractId: 'c_old_1',
    freelancerId: 'u3', // Nimali
    clientId: 'u2',
    clientName: 'Kasun Perera',
    rating: 5,
    comment:
    'Nimali is an absolute expert! The ML model accuracy was beyond my expectations. Highly recommended.',
    tags: ['Expert', 'On Time', 'Great Communication'],
    createdAt: d(25)
  },
  {
    id: 'r2',
    contractId: 'c_old_2',
    freelancerId: 'u3',
    clientId: 'u4',
    clientName: 'Tharindu Jayasinghe',
    rating: 5,
    comment: 'Great work on the python script. Very clean code.',
    tags: ['Clean Code', 'Fast'],
    createdAt: d(40)
  },
  {
    id: 'r3',
    contractId: 'c_old_3',
    freelancerId: 'u3',
    clientId: 'u7',
    clientName: 'Dilini Wickramasinghe',
    rating: 4,
    comment:
    'Good work, but slightly delayed delivery. Quality was top notch though.',
    tags: ['Quality Work'],
    createdAt: d(10)
  },
  {
    id: 'r4',
    contractId: 'c_old_4',
    freelancerId: 'u6', // Ravindu
    clientId: 'u2',
    clientName: 'Kasun Perera',
    rating: 5,
    comment:
    'Ravindu is a React wizard. Helped me fix all bugs in my project.',
    tags: ['React Expert', 'Helpful'],
    createdAt: d(15)
  }];


  // Pre-calculated stats for Nimali (u3)
  // 3 reviews: 5, 5, 4. Avg: 4.7. Total: 3.
  // Breakdown: 5:2, 4:1

  const users: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@freelancehub.com',
    password: 'Admin@123',
    role: 'admin',
    bio: 'Platform administrator',
    createdAt: d(90),
    updatedAt: d(90)
  },
  {
    id: 'u2',
    name: 'Kasun Perera',
    email: 'kasun@uni.lk',
    password: 'Pass@123',
    role: 'client',
    bio: 'CS undergraduate at UoM, need help with final year project',
    createdAt: d(60),
    updatedAt: d(60)
  },
  {
    id: 'u3',
    name: 'Nimali Silva',
    email: 'nimali@uni.lk',
    password: 'Pass@123',
    role: 'freelancer',
    bio: 'Expert in Python, ML, and data analysis. 3rd year IT student.',
    createdAt: d(55),
    updatedAt: d(55),
    // Stats
    totalReviews: 3,
    averageRating: 4.7,
    ratingBreakdown: { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 },
    totalCompletedProjects: 12,
    completionRate: 92,
    totalProposals: 15,
    activeContracts: 1
  },
  {
    id: 'u4',
    name: 'Tharindu Jayasinghe',
    email: 'tharindu@uni.lk',
    password: 'Pass@123',
    role: 'client',
    bio: 'Business student needing presentation and documentation help',
    createdAt: d(50),
    updatedAt: d(50)
  },
  {
    id: 'u5',
    name: 'Sachini Fernando',
    email: 'sachini@uni.lk',
    password: 'Pass@123',
    role: 'freelancer',
    bio: 'Graphic design and slide creation specialist. NSBM student.',
    createdAt: d(45),
    updatedAt: d(45),
    totalReviews: 0,
    averageRating: 0,
    totalCompletedProjects: 0,
    completionRate: 0,
    totalProposals: 1,
    activeContracts: 0
  },
  {
    id: 'u6',
    name: 'Ravindu Bandara',
    email: 'ravindu@uni.lk',
    password: 'Pass@123',
    role: 'freelancer',
    bio: 'Full-stack developer, tutoring in Java and React',
    createdAt: d(40),
    updatedAt: d(40),
    totalReviews: 1,
    averageRating: 5.0,
    ratingBreakdown: { 5: 1, 4: 0, 3: 0, 2: 0, 1: 0 },
    totalCompletedProjects: 5,
    completionRate: 100,
    totalProposals: 8,
    activeContracts: 0
  },
  {
    id: 'u7',
    name: 'Dilini Wickramasinghe',
    email: 'dilini@uni.lk',
    password: 'Pass@123',
    role: 'client',
    bio: 'Engineering student, looking for math tutoring',
    createdAt: d(35),
    updatedAt: d(35)
  },
  {
    id: 'u8',
    name: 'Ashan Gunawardena',
    email: 'ashan@uni.lk',
    password: 'Pass@123',
    role: 'freelancer',
    bio: 'Technical writing and documentation expert',
    createdAt: d(30),
    updatedAt: d(30),
    totalReviews: 0,
    averageRating: 0,
    totalCompletedProjects: 2,
    completionRate: 100,
    totalProposals: 4,
    activeContracts: 0
  },
  {
    id: 'u9',
    name: 'Malini Rajapaksa',
    email: 'malini@uni.lk',
    password: 'Pass@123',
    role: 'client',
    bio: 'Medical student needing notes and study material help',
    createdAt: d(25),
    updatedAt: d(25)
  },
  {
    id: 'u10',
    name: 'Chamara Weerasinghe',
    email: 'chamara@uni.lk',
    password: 'Pass@123',
    role: 'freelancer',
    bio: 'Mathematics tutor, specializing in calculus and statistics',
    createdAt: d(20),
    updatedAt: d(20),
    totalReviews: 0,
    averageRating: 0,
    totalCompletedProjects: 0,
    completionRate: 0,
    totalProposals: 1,
    activeContracts: 0
  }];


  const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Python ML Assignment Help',
    description:
    'Need help implementing a machine learning classification model using scikit-learn for my AI course assignment. Dataset provided.',
    budget: 5000,
    category: 'Assignment Help',
    skills: ['Python', 'Machine Learning', 'scikit-learn'],
    createdBy: 'u2',
    createdByName: 'Kasun Perera',
    status: 'in_progress',
    createdAt: d(20),
    updatedAt: d(15)
  },
  {
    id: 'j2',
    title: 'Business Presentation Design',
    description:
    'Create a professional 20-slide presentation for my marketing course final project. Need modern design with infographics.',
    budget: 3000,
    category: 'Design/Slides',
    skills: ['PowerPoint', 'Design', 'Infographics'],
    createdBy: 'u4',
    createdByName: 'Tharindu Jayasinghe',
    status: 'open',
    createdAt: d(18),
    updatedAt: d(18)
  },
  {
    id: 'j3',
    title: 'React Project Support',
    description:
    'Need a tutor to help me build a CRUD application with React and Node.js for my web development module.',
    budget: 8000,
    category: 'Project Support',
    skills: ['React', 'Node.js', 'MongoDB'],
    createdBy: 'u2',
    createdByName: 'Kasun Perera',
    status: 'open',
    createdAt: d(15),
    updatedAt: d(15)
  },
  {
    id: 'j4',
    title: 'Calculus Tutoring Sessions',
    description:
    'Looking for a tutor for Engineering Mathematics II. Need 5 sessions covering integration and differential equations.',
    budget: 7500,
    category: 'Tutoring',
    skills: ['Calculus', 'Differential Equations', 'Mathematics'],
    createdBy: 'u7',
    createdByName: 'Dilini Wickramasinghe',
    status: 'open',
    createdAt: d(12),
    updatedAt: d(12)
  },
  {
    id: 'j5',
    title: 'Medical Notes Compilation',
    description:
    'Need someone to compile and organize anatomy lecture notes into a structured study guide with diagrams.',
    budget: 4000,
    category: 'Notes',
    skills: ['Medical Knowledge', 'Documentation', 'Diagrams'],
    createdBy: 'u9',
    createdByName: 'Malini Rajapaksa',
    status: 'open',
    createdAt: d(10),
    updatedAt: d(10)
  },
  {
    id: 'j6',
    title: 'Java OOP Assignment',
    description:
    'Help with implementing design patterns (Factory, Observer, Singleton) in a Java project for Software Engineering course.',
    budget: 4500,
    category: 'Assignment Help',
    skills: ['Java', 'OOP', 'Design Patterns'],
    createdBy: 'u7',
    createdByName: 'Dilini Wickramasinghe',
    status: 'open',
    createdAt: d(8),
    updatedAt: d(8)
  },
  {
    id: 'j7',
    title: 'Database Design Project',
    description:
    'Need help designing and implementing a relational database schema for a library management system. ER diagrams + SQL.',
    budget: 6000,
    category: 'Project Support',
    skills: ['SQL', 'Database Design', 'ER Diagrams'],
    createdBy: 'u4',
    createdByName: 'Tharindu Jayasinghe',
    status: 'open',
    createdAt: d(6),
    updatedAt: d(6)
  },
  {
    id: 'j8',
    title: 'Statistics Tutoring',
    description:
    'Need help understanding hypothesis testing, regression analysis, and ANOVA for my research methods course.',
    budget: 5500,
    category: 'Tutoring',
    skills: ['Statistics', 'SPSS', 'Research Methods'],
    createdBy: 'u9',
    createdByName: 'Malini Rajapaksa',
    status: 'open',
    createdAt: d(4),
    updatedAt: d(4)
  },
  {
    id: 'j9',
    title: 'Technical Report Writing',
    description:
    'Need a well-structured technical report for my final year engineering project. ~30 pages with proper IEEE formatting.',
    budget: 6500,
    category: 'Other',
    skills: ['Technical Writing', 'IEEE Format', 'LaTeX'],
    createdBy: 'u2',
    createdByName: 'Kasun Perera',
    status: 'open',
    createdAt: d(3),
    updatedAt: d(3)
  },
  {
    id: 'j10',
    title: 'UI/UX Design for Mobile App',
    description:
    'Design wireframes and high-fidelity mockups for a campus event management mobile app. Figma preferred.',
    budget: 10000,
    category: 'Design/Slides',
    skills: ['Figma', 'UI/UX', 'Mobile Design'],
    createdBy: 'u4',
    createdByName: 'Tharindu Jayasinghe',
    status: 'open',
    createdAt: d(2),
    updatedAt: d(2)
  },
  {
    id: 'j11',
    title: 'Data Structures Assignment',
    description:
    'Implement AVL trees, hash tables, and graph algorithms in C++ with proper documentation and time complexity analysis.',
    budget: 5000,
    category: 'Assignment Help',
    skills: ['C++', 'Data Structures', 'Algorithms'],
    createdBy: 'u7',
    createdByName: 'Dilini Wickramasinghe',
    status: 'open',
    createdAt: d(1),
    updatedAt: d(1)
  },
  {
    id: 'j12',
    title: 'Pharmacology Notes Summary',
    description:
    'Summarize pharmacology lecture notes (cardiovascular drugs) into concise revision cards with drug interactions.',
    budget: 3500,
    category: 'Notes',
    skills: ['Pharmacology', 'Medical Writing', 'Summarization'],
    createdBy: 'u9',
    createdByName: 'Malini Rajapaksa',
    status: 'open',
    createdAt: d(1),
    updatedAt: d(1)
  }];


  const proposals: Proposal[] = [
  {
    id: 'p1',
    jobId: 'j1',
    freelancerId: 'u3',
    freelancerName: 'Nimali Silva',
    coverLetter:
    'I have extensive experience with scikit-learn and ML classification.',
    bidAmount: 4500,
    estimatedDays: 3,
    status: 'accepted',
    submittedAt: d(19),
    updatedAt: d(17)
  },
  {
    id: 'p2',
    jobId: 'j1',
    freelancerId: 'u6',
    freelancerName: 'Ravindu Bandara',
    coverLetter:
    'I can help with your ML assignment. I have completed similar projects before.',
    bidAmount: 5000,
    estimatedDays: 4,
    status: 'rejected',
    submittedAt: d(19),
    updatedAt: d(17)
  },
  {
    id: 'p3',
    jobId: 'j2',
    freelancerId: 'u5',
    freelancerName: 'Sachini Fernando',
    coverLetter:
    'I specialize in professional presentation design with modern layouts and infographics.',
    bidAmount: 2800,
    estimatedDays: 2,
    status: 'pending',
    submittedAt: d(17),
    updatedAt: d(17)
  },
  {
    id: 'p4',
    jobId: 'j3',
    freelancerId: 'u6',
    freelancerName: 'Ravindu Bandara',
    coverLetter:
    'React and Node.js are my core skills. I can guide you through building the entire CRUD app.',
    bidAmount: 7500,
    estimatedDays: 5,
    status: 'pending',
    submittedAt: d(14),
    updatedAt: d(14)
  },
  {
    id: 'p5',
    jobId: 'j4',
    freelancerId: 'u10',
    freelancerName: 'Chamara Weerasinghe',
    coverLetter:
    'Mathematics is my passion. I have been tutoring calculus for 2 years.',
    bidAmount: 7000,
    estimatedDays: 10,
    status: 'pending',
    submittedAt: d(11),
    updatedAt: d(11)
  },
  {
    id: 'p6',
    jobId: 'j5',
    freelancerId: 'u8',
    freelancerName: 'Ashan Gunawardena',
    coverLetter:
    'I have experience in medical documentation and can create well-organized study guides.',
    bidAmount: 3800,
    estimatedDays: 4,
    status: 'pending',
    submittedAt: d(9),
    updatedAt: d(9)
  },
  {
    id: 'p7',
    jobId: 'j3',
    freelancerId: 'u3',
    freelancerName: 'Nimali Silva',
    coverLetter:
    'I can help with the React project. While my main expertise is Python, I have solid React experience too.',
    bidAmount: 7000,
    estimatedDays: 6,
    status: 'pending',
    submittedAt: d(13),
    updatedAt: d(13)
  }];


  const contracts: Contract[] = [
  {
    id: 'c1',
    jobId: 'j1',
    proposalId: 'p1',
    clientId: 'u2',
    freelancerId: 'u3',
    agreedPrice: 4500,
    status: 'active',
    startedAt: d(17),
    paymentStatus: 'paid'
  },
  // Add some completed contracts for history
  {
    id: 'c_old_1',
    jobId: 'j_old_1',
    proposalId: 'p_old_1',
    clientId: 'u2',
    freelancerId: 'u3',
    agreedPrice: 5000,
    status: 'completed',
    startedAt: d(30),
    completedAt: d(25),
    paymentStatus: 'paid'
  },
  {
    id: 'c_old_2',
    jobId: 'j_old_2',
    proposalId: 'p_old_2',
    clientId: 'u4',
    freelancerId: 'u3',
    agreedPrice: 3000,
    status: 'completed',
    startedAt: d(45),
    completedAt: d(40),
    paymentStatus: 'paid'
  },
  {
    id: 'c_old_3',
    jobId: 'j_old_3',
    proposalId: 'p_old_3',
    clientId: 'u7',
    freelancerId: 'u3',
    agreedPrice: 4000,
    status: 'completed',
    startedAt: d(15),
    completedAt: d(10),
    paymentStatus: 'paid'
  },
  {
    id: 'c_old_4',
    jobId: 'j_old_4',
    proposalId: 'p_old_4',
    clientId: 'u2',
    freelancerId: 'u6',
    agreedPrice: 6000,
    status: 'completed',
    startedAt: d(20),
    completedAt: d(15),
    paymentStatus: 'paid'
  }];


  const threads: ChatThread[] = [
  {
    id: 't1',
    jobId: 'j1',
    clientId: 'u2',
    freelancerId: 'u3',
    createdAt: d(17),
    lastMessageAt: d(2)
  }];


  const messages: Message[] = [
  {
    id: 'm1',
    threadId: 't1',
    senderId: 'u2',
    text: 'Hi Nimali! Thanks for accepting. The dataset is in the shared drive.',
    createdAt: d(17),
    readBy: ['u2', 'u3']
  },
  {
    id: 'm2',
    threadId: 't1',
    senderId: 'u3',
    text: 'Got it! I will start with EDA and share initial findings by tomorrow.',
    createdAt: d(16),
    readBy: ['u2', 'u3']
  },
  {
    id: 'm3',
    threadId: 't1',
    senderId: 'u3',
    text: 'I have completed the data preprocessing. Moving to model training now.',
    createdAt: d(10),
    readBy: ['u2', 'u3']
  },
  {
    id: 'm4',
    threadId: 't1',
    senderId: 'u2',
    text: 'Great progress! Can you also include a confusion matrix in the report?',
    createdAt: d(5),
    readBy: ['u2', 'u3']
  },
  {
    id: 'm5',
    threadId: 't1',
    senderId: 'u3',
    text: 'Sure, I will add confusion matrix, ROC curve, and classification report.',
    createdAt: d(3),
    readBy: ['u2']
  }];


  const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u2',
    type: 'proposal_submitted',
    title: 'New Proposal',
    message:
    'Nimali Silva submitted a proposal for "Python ML Assignment Help"',
    relatedId: 'j1',
    isRead: true,
    createdAt: d(19)
  },
  {
    id: 'n2',
    userId: 'u2',
    type: 'proposal_submitted',
    title: 'New Proposal',
    message:
    'Ravindu Bandara submitted a proposal for "Python ML Assignment Help"',
    relatedId: 'j1',
    isRead: true,
    createdAt: d(19)
  },
  {
    id: 'n3',
    userId: 'u3',
    type: 'proposal_accepted',
    title: 'Proposal Accepted!',
    message:
    'Your proposal for "Python ML Assignment Help" has been accepted',
    relatedId: 'j1',
    isRead: true,
    createdAt: d(17)
  },
  {
    id: 'n4',
    userId: 'u6',
    type: 'proposal_rejected',
    title: 'Proposal Rejected',
    message: 'Your proposal for "Python ML Assignment Help" was not selected',
    relatedId: 'j1',
    isRead: true,
    createdAt: d(17)
  },
  {
    id: 'n5',
    userId: 'u2',
    type: 'contract_created',
    title: 'Contract Created',
    message:
    'Contract created for "Python ML Assignment Help" with Nimali Silva',
    relatedId: 'c1',
    isRead: true,
    createdAt: d(17)
  },
  {
    id: 'n6',
    userId: 'u3',
    type: 'contract_created',
    title: 'Contract Created',
    message:
    'Contract created for "Python ML Assignment Help" with Kasun Perera',
    relatedId: 'c1',
    isRead: true,
    createdAt: d(17)
  },
  {
    id: 'n7',
    userId: 'u3',
    type: 'message_received',
    title: 'New Message',
    message: 'Kasun Perera sent you a message',
    relatedId: 't1',
    isRead: false,
    createdAt: d(5)
  },
  {
    id: 'n8',
    userId: 'u2',
    type: 'payment_paid',
    title: 'Payment Successful',
    message: 'Payment of LKR 4,500 completed',
    relatedId: 'pay1',
    isRead: false,
    createdAt: d(15)
  },
  {
    id: 'n9',
    userId: 'u3',
    type: 'payment_paid',
    title: 'Payment Received',
    message: 'Payment of LKR 4,500 received',
    relatedId: 'pay1',
    isRead: false,
    createdAt: d(15)
  },
  {
    id: 'n10',
    userId: 'u4',
    type: 'proposal_submitted',
    title: 'New Proposal',
    message:
    'Sachini Fernando submitted a proposal for "Business Presentation Design"',
    relatedId: 'j2',
    isRead: false,
    createdAt: d(17)
  }];


  const payments: Payment[] = [
  {
    id: 'pay1',
    contractId: 'c1',
    clientId: 'u2',
    amount: 4500,
    currency: 'LKR',
    provider: 'dummy_stripe',
    status: 'paid',
    createdAt: d(15),
    updatedAt: d(15),
    receiptUrl: '#receipt-pay1'
  }];


  const applied: Record<string, string[]> = { u3: ['j1'], u6: ['j1'] };
  const saved: Record<string, string[]> = { u3: ['j3', 'j4'], u6: ['j2'] };

  writeStore(STORAGE_KEYS.USERS, users);
  writeStore(STORAGE_KEYS.JOBS, jobs);
  writeStore(STORAGE_KEYS.PROPOSALS, proposals);
  writeStore(STORAGE_KEYS.CONTRACTS, contracts);
  writeStore(STORAGE_KEYS.REVIEWS, reviews);
  writeStore(STORAGE_KEYS.CHAT_THREADS, threads);
  writeStore(STORAGE_KEYS.MESSAGES, messages);
  writeStore(STORAGE_KEYS.NOTIFICATIONS, notifications);
  writeStore(STORAGE_KEYS.PAYMENTS, payments);
  writeStore(STORAGE_KEYS.APPLIED_JOBS, applied);
  writeStore(STORAGE_KEYS.SAVED_JOBS, saved);
  writeStore(STORAGE_KEYS.SEEDED, true);
}