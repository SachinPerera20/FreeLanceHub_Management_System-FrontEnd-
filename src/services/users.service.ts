import { SafeUser } from '../types';
import { api } from '../lib/axios';

export const usersService = {
  async getUserById(userId: string): Promise<SafeUser | null> {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data as SafeUser;
    } catch {
      return null;
    }
  },

  // Was a localStorage stat calculator. No-op now — stats are server-side.
  async calculateAndSavePerformanceStats(userId: string): Promise<void> {
    return;
  },
};