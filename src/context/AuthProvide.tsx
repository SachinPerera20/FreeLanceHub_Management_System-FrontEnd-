import React, { useEffect, useMemo, useState } from 'react';
import axiosClient from '../lib/axios';
import type { User } from '../types/user.types';
import { AuthContext, STORAGE_KEYS, safeJsonParse } from './auth.context';
import type { AuthContextValue, LoginCredentials } from './auth.context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.token);
    const savedUser = safeJsonParse<User>(localStorage.getItem(STORAGE_KEYS.user));

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const clearError = () => setError(null);

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosClient.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      });

      setToken(res.data.token);
      setUser(res.data.user);

      localStorage.setItem(STORAGE_KEYS.token, res.data.token);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(res.data.user));
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);

    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isLoading, error, login, logout, clearError }),
    [user, token, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
