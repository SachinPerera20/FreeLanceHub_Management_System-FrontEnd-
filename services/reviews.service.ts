import { Review, CreateReviewInput } from '../types';
import {
  STORAGE_KEYS,
  readStore,
  writeStore,
  generateId,
  nowISO } from
'../lib/storage';

export const reviewsService = {
  async listByFreelancer(freelancerId: string): Promise<Review[]> {
    const reviews = readStore<Review[]>(STORAGE_KEYS.REVIEWS, []);
    return reviews.
    filter((r) => r.freelancerId === freelancerId).
    sort(
      (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async createReview(
  input: CreateReviewInput,
  clientId: string,
  clientName: string)
  : Promise<Review> {
    const reviews = readStore<Review[]>(STORAGE_KEYS.REVIEWS, []);

    // Check if review already exists for this contract
    const existing = reviews.find((r) => r.contractId === input.contractId);
    if (existing) {
      throw new Error('Review already exists for this contract');
    }

    const newReview: Review = {
      id: generateId(),
      clientId,
      clientName,
      createdAt: nowISO(),
      ...input
    };

    const updatedReviews = [...reviews, newReview];
    writeStore(STORAGE_KEYS.REVIEWS, updatedReviews);

    // Note: User stats updating should ideally happen here or be triggered
    // For this implementation, we'll assume the UI or a separate process updates the user stats
    // or we can calculate them on the fly.
    // However, the requirement says "Add to freelancer data model", so we should update the user here.
    await this.updateFreelancerStats(input.freelancerId, updatedReviews);

    return newReview;
  },

  async updateFreelancerStats(freelancerId: string, allReviews?: Review[]) {
    const reviews = allReviews || readStore<Review[]>(STORAGE_KEYS.REVIEWS, []);
    const freelancerReviews = reviews.filter(
      (r) => r.freelancerId === freelancerId
    );

    const totalReviews = freelancerReviews.length;
    const totalRating = freelancerReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating =
    totalReviews > 0 ? Number((totalRating / totalReviews).toFixed(1)) : 0;

    const ratingBreakdown: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };
    freelancerReviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      if (ratingBreakdown[rounded] !== undefined) {
        ratingBreakdown[rounded]++;
      }
    });

    // Update user in storage
    const users = readStore<any[]>(STORAGE_KEYS.USERS, []);
    const updatedUsers = users.map((u) => {
      if (u.id === freelancerId) {
        return {
          ...u,
          totalReviews,
          averageRating,
          ratingBreakdown
        };
      }
      return u;
    });
    writeStore(STORAGE_KEYS.USERS, updatedUsers);
  }
};