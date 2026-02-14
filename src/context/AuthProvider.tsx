import React, { useEffect, useMemo, useState } from "react";
import type { User } from "../types/user.types";
import { AuthContext, STORAGE_KEYS, safeJsonParse } from "./auth.context";
import type { AuthContextValue, LoginCredentials, RegisterPayload } from "./auth.context";

const USERS_KEY = "freelancehub_users";

function safeParseArray<T>(raw: string | null): T[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

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
      const users = safeParseArray<(User & { password?: string })>(
        localStorage.getItem(USERS_KEY)
      );

      const found = users.find((u) => u.email === email);

      if (!found) {
        setError("No account found for this email.");
        throw new Error("No account found");
      }

      // mock auth: we store password in localStorage for login testing only
      if ((found.password ?? "") !== password) {
        setError("Incorrect password.");
        throw new Error("Incorrect password");
      }

      const mockToken = `mock_${found.id}`;

      setUser(found);
      setToken(mockToken);

      localStorage.setItem(STORAGE_KEYS.token, mockToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(found));
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async ({ email, password, name, role }: RegisterPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const now = new Date().toISOString();

      const users = safeParseArray<(User & { password?: string })>(
        localStorage.getItem(USERS_KEY)
      );

      const exists = users.some((u) => u.email === email);
      if (exists) {
        setError("This email is already registered.");
        throw new Error("Email already registered");
      }

      // include password in localStorage ONLY for mock login testing
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        role,
        createdAt: now,
        updatedAt: now,
        password,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

      const mockToken = `mock_${newUser.id}`;

      setUser(newUser);
      setToken(mockToken);

      localStorage.setItem(STORAGE_KEYS.token, mockToken);
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(newUser));
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
      register: registerUser,
      logout,
      clearError,
    }),
    [user, token, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
