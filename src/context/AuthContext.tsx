import React, { useEffect, useMemo, useState } from 'react';
import axiosClient from '../lib/axios';
import type { User } from '../types/user.types';
import { AuthContext } from './authContext';
import type { AuthContextValue, LoginCredentials } from './authContext';

const STORAGE_KEYS = {
  token: 'auth_token',
  user: 'auth_user',
} as const;
// Small helper so localStorage JSON parse doesn't crash the app
function safeJsonParse<T>(value: string | null): T | null {
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

     // 1) Hydrate auth state from localStorage on app start (refresh-safe login)
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.token);
    const savedUser = safeJsonParse<User>(localStorage.getItem(STORAGE_KEYS.user));

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const clearError = () => setError(null);
 //backend-ready

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
       // exact endpoint , response format.
        
        const res = await axiosClient.post<{ token: string; user: User }>('/auth/login', {
          email,
          password,
        });

        const newToken = res.data.token;
        const newUser = res.data.user;
  
        setToken(newToken);
        setUser(newUser);
  
        localStorage.setItem(STORAGE_KEYS.token, newToken);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newUser));
  
    } catch (err: unknown) {
        
        setError('Login failed. Please check your email/password and try again.');
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
        () => ({
          user,
          token,
          isLoading,
          error,
          login,
          logout,
          clearError,
        }),
        [user, token, isLoading, error]
      );
    
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    }
    
    