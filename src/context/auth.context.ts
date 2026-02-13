import { createContext } from 'react';
import type { User } from '../types/user.types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  role: 'client' | 'freelancer';
};

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const STORAGE_KEYS = {
  token: 'auth_token',
  user: 'auth_user',
} as const;

export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
