import React, { createContext, useEffect, useMemo, useState } from 'react';
import axiosClient from '../lib/axios';
import type { User } from '../types/user.types';

type LoginCredentials = {
    email: string;
    password: string;
  };
  type AuthContextValue = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;

    login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};