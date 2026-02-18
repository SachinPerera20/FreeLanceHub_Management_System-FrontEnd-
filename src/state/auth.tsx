import React, { useCallback, useEffect, useState, createContext, useContext } from 'react';
import { SafeUser, LoginInput, RegisterInput, UserRole } from '../types';
import { authService } from '../services/auth.service';
interface AuthState {
  user: SafeUser | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  login: (emailOrInput: string | LoginInput, password?: string) => Promise<void>;
  register: (nameOrInput: string | RegisterInput, email?: string, password?: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: {
    name?: string;
    bio?: string;
  }) => Promise<void>;
  getAllUsers: () => Promise<SafeUser[]>;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}
const AuthContext = createContext<AuthState | undefined>(undefined);
export function AuthProvider({
  children


}: {children: ReactNode;}) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    authService.getMe().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);
  const login = useCallback(async (emailOrInput: string | LoginInput, password?: string) => {
    try {
      setError(null);
      setLoading(true);
      const input: LoginInput = typeof emailOrInput === 'string' ? {
        email: emailOrInput,
        password: password || ''
      } : emailOrInput;
      const {
        user: u
      } = await authService.login(input);
      setUser(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  const register = useCallback(async (nameOrInput: string | RegisterInput, email?: string, password?: string, role?: UserRole) => {
    try {
      setError(null);
      setLoading(true);
      const input: RegisterInput = typeof nameOrInput === 'string' ? {
        name: nameOrInput,
        email: email || '',
        password: password || '',
        role: role || 'client'
      } : nameOrInput;
      const {
        user: u
      } = await authService.register(input);
      setUser(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);
  const clearError = useCallback(() => setError(null), []);
  const updateProfile = useCallback(async (data: {
    name?: string;
    bio?: string;
  }) => {
    if (!user) return;
    const updated = await authService.updateProfile(user.id, data);
    setUser(updated);
  }, [user]);
  const getAllUsers = useCallback(async () => authService.getAllUsers(), []);
  const updateUserRole = useCallback(async (userId: string, role: UserRole) => {
    await authService.updateUserRole(userId, role);
  }, []);
  const deleteUser = useCallback(async (userId: string) => {
    await authService.deleteUser(userId);
  }, []);
  return <AuthContext.Provider value={{
    user,
    loading,
    isLoading: loading,
    error,
    login,
    register,
    logout,
    clearError,
    updateProfile,
    getAllUsers,
    updateUserRole,
    deleteUser
  }}>
      {children}
    </AuthContext.Provider>;
}
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}