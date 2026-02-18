import React from 'react';
import { Star, StarHalf } from 'lucide-react';
interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}
export function RatingStars({
  rating,
  size = 16,
  className = ''
}: RatingStarsProps) {
  // Ensure rating is between 0 and 5
  const safeRating = Math.max(0, Math.min(5, rating));
  return <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
      const isFull = safeRating >= star;
      const isHalf = safeRating >= star - 0.5 && safeRating < star;
      return <div key={star} className="relative">
            {/* Empty Star Background */}
            <Star size={size} className="text-gray-700 fill-gray-700" />

            {/* Filled Star Overlay */}
            {(isFull || isHalf) && <div className="absolute top-0 left-0 overflow-hidden" style={{
          width: isFull ? '100%' : '50%'
        }}>
                <Star size={size} className="text-[#f97316] fill-[#f97316]" />
              </div>}
          </div>;
    })}
    </div>;
}