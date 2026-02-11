import { createContext } from 'react';
import type { User } from '../types/user.types';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);


