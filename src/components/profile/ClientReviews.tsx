import React, { useEffect, useState } from 'react';
import { Review } from '../../types';
import { reviewsService } from '../../services/reviews.service';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { RatingStars } from '../ui/RatingStars';
import { formatDistanceToNow } from 'date-fns';
import { User as UserIcon } from 'lucide-react';
import { Button } from '../ui/FormControls';
interface ClientReviewsProps {
  freelancerId: string;
}
export function ClientReviews({
  freelancerId
}: ClientReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewsService.listByFreelancer(freelancerId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      } finally {
        setLoading(false);
      }
    };
    if (freelancerId) {
      fetchReviews();
    }
  }, [freelancerId]);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };
  if (loading) {
    return <Card className="mt-8">
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f97316] mx-auto"></div>
        </CardContent>
      </Card>;
  }
  if (reviews.length === 0) {
    return <Card className="mt-8">
        <CardHeader>
          <CardTitle>Client Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-[#666666] bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
            No reviews yet.
          </div>
        </CardContent>
      </Card>;
  }
  const visibleReviews = reviews.slice(0, visibleCount);
  return <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Client Reviews ({reviews.length})</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {visibleReviews.map((review) => <div key={review.id} className="bg-[#111827]/30 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                  {review.clientAvatar ? <img src={review.clientAvatar} alt={review.clientName} className="w-full h-full rounded-full object-cover" /> : <UserIcon className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {review.clientName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <span>
                      {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true
                  })}
                    </span>
                  </div>
                </div>
              </div>
              <RatingStars rating={review.rating} />
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">
              {review.comment}
            </p>

            {review.tags && review.tags.length > 0 && <div className="flex flex-wrap gap-2">
                {review.tags.map((tag, idx) => <span key={idx} className="px-2.5 py-1 bg-[#1f2937] text-gray-400 text-xs rounded-full border border-gray-700">
                    {tag}
                  </span>)}
              </div>}
          </div>)}

        {visibleCount < reviews.length && <div className="text-center pt-4">
            <Button variant="outline" onClick={handleLoadMore}>
              Load More Reviews
            </Button>
          </div>}
      </CardContent>
    </Card>;
}