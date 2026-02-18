import React from 'react';
import { User } from '../../types';
import { RatingStars } from '../ui/RatingStars';
interface FreelancerRatingProps {
  user: User;
}
export function FreelancerRating({
  user
}: FreelancerRatingProps) {
  const rating = user.averageRating || 0;
  const count = user.totalReviews || 0;
  const breakdown = user.ratingBreakdown || {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };
  return <div className="mt-3 group relative inline-block">
      <div className="flex items-center gap-2 cursor-help">
        <div className="flex items-center gap-1 bg-[#111827]/50 px-3 py-1.5 rounded-full border border-gray-800">
          <span className="font-bold text-white">{rating.toFixed(1)}</span>
          <RatingStars rating={rating} size={14} />
          <span className="text-xs text-[#888888] ml-1">({count} reviews)</span>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-[#1a1a1a] border border-[#333333] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <h4 className="text-sm font-semibold text-white mb-3">
          Rating Breakdown
        </h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
          const starCount = breakdown[star as keyof typeof breakdown] || 0;
          const percentage = count > 0 ? starCount / count * 100 : 0;
          return <div key={star} className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 w-8 text-[#888888]">
                  <span>{star}</span>
                  <span className="text-[#f97316]">★</span>
                </div>
                <div className="flex-1 h-1.5 bg-[#333333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f97316] rounded-full" style={{
                width: `${percentage}%`
              }} />
                </div>
                <div className="w-8 text-right text-[#666666]">
                  {Math.round(percentage)}%
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
}