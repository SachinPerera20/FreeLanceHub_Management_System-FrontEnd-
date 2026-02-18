import { SafeUser, AuthPayload, LoginInput, RegisterInput } from '../types';
import { STORAGE_KEYS, writeStore, removeStore } from '../lib/storage';
import { api } from '../lib/axios';

export const authService = {
  async login(input: LoginInput): Promise<AuthPayload> {
    const res = await api.post('/auth/login', input);
    const token: string = res.data.token;
    const user: SafeUser = res.data.user;
    writeStore(STORAGE_KEYS.TOKEN, token);
    writeStore(STORAGE_KEYS.CURRENT_USER, user);
    return { token, user };
  },

  async register(input: RegisterInput): Promise<AuthPayload> {
    const res = await api.post('/auth/register', input);
    const token: string = res.data.token;
    const user: SafeUser = res.data.user;
    writeStore(STORAGE_KEYS.TOKEN, token);
    writeStore(STORAGE_KEYS.CURRENT_USER, user);
    return { token, user };
  },

  async logout(): Promise<void> {
    removeStore(STORAGE_KEYS.TOKEN);
    removeStore(STORAGE_KEYS.CURRENT_USER);
  },

  async getMe(): Promise<SafeUser | null> {
    try {
      const res = await api.get('/auth/me');
      const user: SafeUser = res.data;
      writeStore(STORAGE_KEYS.CURRENT_USER, user);
      return user;
    } catch {
      return null;
    }
  },

  async updateProfile(userId: string, data: { name?: string; bio?: string }): Promise<SafeUser> {
    const res = await api.put('/auth/profile', data);
    const user: SafeUser = res.data;
    writeStore(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },

  async getAllUsers(): Promise<SafeUser[]> {
    const res = await api.get('/users');
    return res.data as SafeUser[];
  },

  async updateUserRole(userId: string, role: string): Promise<SafeUser> {
    const res = await api.patch(`/users/${userId}/role`, { role });
    return res.data as SafeUser;
  },

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  },
};