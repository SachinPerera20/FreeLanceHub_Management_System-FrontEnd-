import { Review, CreateReviewInput } from '../types';
import { api } from '../lib/axios';

export const reviewsService = {
  async listByFreelancer(freelancerId: string): Promise<Review[]> {
    const res = await api.get(`/reviews/freelancer/${freelancerId}`);
    return res.data as Review[];
  },

  async createReview(
      input: CreateReviewInput,
      clientId: string,
      clientName: string
  ): Promise<Review> {
    const res = await api.post('/reviews', input);
    return res.data as Review;
  },

  async getContractReview(contractId: string): Promise<Review | null> {
    try {
      const res = await api.get(`/reviews/contract/${contractId}`);
      return res.data as Review;
    } catch {
      return null;
    }
  },

  // Was a localStorage-only helper. No-op now since stats are server-side.
  async updateFreelancerStats(freelancerId: string): Promise<void> {
    return;
  },
};