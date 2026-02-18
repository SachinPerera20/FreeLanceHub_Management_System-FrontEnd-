import { SafeUser, User } from '../types';
import { STORAGE_KEYS, readStore, writeStore } from '../lib/storage';

export const usersService = {
  async getUserById(userId: string): Promise<SafeUser | null> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },

  async calculateAndSavePerformanceStats(userId: string): Promise<void> {
    const users = readStore<User[]>(STORAGE_KEYS.USERS, []);
    const contracts = readStore<any[]>(STORAGE_KEYS.CONTRACTS, []);
    const proposals = readStore<any[]>(STORAGE_KEYS.PROPOSALS, []);

    const userContracts = contracts.filter((c) => c.freelancerId === userId);
    const userProposals = proposals.filter((p) => p.freelancerId === userId);

    const totalProposals = userProposals.length;
    const activeContracts = userContracts.filter(
      (c) => c.status === 'active'
    ).length;
    const completedProjects = userContracts.filter(
      (c) => c.status === 'completed'
    ).length;

    // Completion Rate: completed / accepted * 100
    // accepted = contracts count (since contract is created on acceptance)
    const acceptedProjects = userContracts.length;
    const completionRate =
    acceptedProjects > 0 ?
    Math.round(completedProjects / acceptedProjects * 100) :
    0;

    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          totalProposals,
          activeContracts,
          totalCompletedProjects: completedProjects,
          completionRate
        };
      }
      return u;
    });

    writeStore(STORAGE_KEYS.USERS, updatedUsers);
  }
};