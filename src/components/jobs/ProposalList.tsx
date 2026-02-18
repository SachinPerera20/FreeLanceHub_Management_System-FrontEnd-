import React, { useEffect, useState } from 'react';
import { Proposal, SafeUser } from '../../types';
import { Card } from '../ui/Cards';
import { Button } from '../ui/FormControls';
import { StatusBadge } from '../ui/Badges';
import { formatDistanceToNow } from 'date-fns';
import { Check, X, Star, ShieldCheck, Award } from 'lucide-react';
import { usersService } from '../../services/users.service';
import { RatingStars } from '../ui/RatingStars';
import { Link } from 'react-router-dom';
interface ProposalListProps {
  proposals: Proposal[];
  onAccept?: (proposalId: string) => void;
  onReject?: (proposalId: string) => void;
  isOwner: boolean;
}
// Helper component to fetch and display freelancer stats
function FreelancerStats({ freelancerId }: {freelancerId: string;}) {
  const [freelancer, setFreelancer] = useState<SafeUser | null>(null);
  useEffect(() => {
    usersService.getUserById(freelancerId).then(setFreelancer);
  }, [freelancerId]);
  if (!freelancer) return null;
  const rating = freelancer.averageRating || 0;
  const reviews = freelancer.totalReviews || 0;
  const completionRate = freelancer.completionRate || 0;
  const completedProjects = freelancer.totalCompletedProjects || 0;
  return (
    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
      {/* Rating Block */}
      <div className="flex items-center gap-1.5 bg-[#1f2937]/50 px-2 py-1 rounded-md border border-gray-700/50">
        <span className="font-bold text-white">{rating.toFixed(1)}</span>
        <RatingStars rating={rating} size={12} />
        <span className="text-gray-500 text-xs">({reviews})</span>
      </div>

      {/* Completion Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <span className="text-[#f97316] font-medium">{completionRate}%</span>
          <span>Completion</span>
        </div>
        <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
        <div>
          <span className="text-white font-medium">{completedProjects}</span>{' '}
          Projects
        </div>
      </div>

      {/* Trust Badges */}
      {rating >= 4.5 && reviews > 5 &&
      <div className="flex items-center gap-1 text-xs font-medium text-teal-400 bg-teal-900/20 px-2 py-0.5 rounded border border-teal-500/20">
          <Award className="w-3 h-3" /> Top Rated
        </div>
      }
      {completionRate >= 90 && completedProjects > 3 &&
      <div className="flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-500/20">
          <ShieldCheck className="w-3 h-3" /> Reliable
        </div>
      }
    </div>);

}
export function ProposalList({
  proposals,
  onAccept,
  onReject,
  isOwner
}: ProposalListProps) {
  if (proposals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
        No proposals yet.
      </div>);

  }
  return (
    <div className="space-y-4">
      {proposals.map((proposal) =>
      <Card
        key={proposal.id}
        className="bg-[#1f2937]/30 hover:border-gray-700 transition-colors">

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Link
                to={`/profile/${proposal.freelancerId}`}
                className="font-bold text-lg text-white tracking-tight hover:text-teal-400 transition-colors">

                  {proposal.freelancerName}
                </Link>
                <StatusBadge status={proposal.status} />
              </div>

              {/* New Freelancer Stats Section */}
              <FreelancerStats freelancerId={proposal.freelancerId} />

              <p className="text-xs text-gray-500 mt-2">
                Submitted{' '}
                {formatDistanceToNow(new Date(proposal.submittedAt), {
                addSuffix: true
              })}
              </p>
            </div>

            <div className="text-left md:text-right bg-[#111827]/50 p-3 rounded-lg border border-gray-800 min-w-[140px]">
              <div className="text-xl font-bold text-[#f97316]">
                LKR {proposal.bidAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {proposal.estimatedDays} days delivery
              </div>
            </div>
          </div>

          <div className="bg-[#111827]/50 p-4 rounded-lg border border-gray-800/50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Cover Letter
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {proposal.coverLetter}
            </p>
          </div>

          {isOwner && proposal.status === 'pending' && onAccept && onReject &&
        <div className="flex justify-end space-x-3 border-t border-gray-700/50 pt-4 mt-4">
              <Button
            variant="danger"
            size="sm"
            onClick={() => onReject(proposal.id)}>

                <X className="w-4 h-4 mr-1" /> Reject
              </Button>
              <Button
            variant="primary"
            size="sm"
            onClick={() => onAccept(proposal.id)}>

                <Check className="w-4 h-4 mr-1" /> Accept & Hire
              </Button>
            </div>
        }
        </Card>
      )}
    </div>);

}