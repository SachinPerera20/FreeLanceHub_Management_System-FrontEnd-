import React from 'react';
import { JobStatus, ProposalStatus, ContractStatus, PaymentStatus, UserRole, ServiceCategory } from '../../types';
// Helper for consistent badge styling
const BadgeBase = ({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) => <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium border ${className}`}>
    {children}
  </span>;
export function StatusBadge({
  status


}: {status: JobStatus | ProposalStatus | ContractStatus;}) {
  const styles: Record<string, string> = {
    // Job Statuses
    open: 'bg-white/5 text-white border-white/20',
    in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-400 border-green-500/20',
    // Proposal Statuses
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    accepted: 'bg-green-500/10 text-green-400 border-green-500/20',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    withdrawn: 'bg-white/5 text-[#666666] border-white/10',
    // Contract Statuses
    active: 'bg-white text-black border-transparent font-bold',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
  };
  const labels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    completed: 'Completed',
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn',
    active: 'Active',
    cancelled: 'Cancelled'
  };
  const key = status as string;
  return <BadgeBase className={styles[key] || styles.open}>
      {labels[key] || status}
    </BadgeBase>;
}
export function RoleBadge({
  role


}: {role: UserRole;}) {
  const styles = {
    client: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    freelancer: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    admin: 'bg-red-500/10 text-red-400 border-red-500/20'
  };
  return <BadgeBase className={styles[role]}>{role}</BadgeBase>;
}
export function PaymentBadge({
  status


}: {status?: PaymentStatus;}) {
  if (!status) return <span className="text-[#666666] text-xs">No Payment</span>;
  const styles: Record<string, string> = {
    unpaid: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    paid: 'bg-green-500/10 text-green-400 border-green-500/20',
    failed: 'bg-red-500/10 text-red-400 border-red-500/20',
    refunded: 'bg-white/5 text-[#666666] border-white/10'
  };
  return <BadgeBase className={styles[status] || styles.unpaid}>{status}</BadgeBase>;
}
export function CategoryBadge({
  category


}: {category: ServiceCategory;}) {
  return <BadgeBase className="bg-white/5 text-[#888888] border-white/10">
      {category}
    </BadgeBase>;
}