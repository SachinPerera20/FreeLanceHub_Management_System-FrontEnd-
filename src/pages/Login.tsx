import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Button, Input } from '../components/ui/FormControls';
import { Card } from '../components/ui/Cards';
import { api } from '../lib/axios';
import { STORAGE_KEYS, writeStore } from '../lib/storage';
import { SafeUser } from '../types';

declare const google: any;

const GOOGLE_CLIENT_ID = '962166256032-k7ihoni7cj63qtmnbpqg8cs2b3sap5qn.apps.googleusercontent.com';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const { login,loginWithToken, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user was trying to access a protected page before being sent to login,
  // send them back there. Otherwise go to '/' and let RoleCheckpoint decide.
  const from = (location.state as any)?.from?.pathname || '/';

  const handleGoogleCredential = useCallback(async (response: any) => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      const res = await api.post('/auth/google', { token: response.credential });
      const token: string = res.data.token;
      const user: SafeUser = res.data.user;
      loginWithToken(token,user);

      if (user.role === 'PENDING' || user.role === 'pending') {
        // New Google user — needs to pick a role first
        navigate('/register?step=role');
      } else {
        // RoleCheckpoint at '/' will redirect to the right dashboard
        navigate(from, { replace: true });
      }
    } catch (err) {
      setGoogleError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  }, [from, navigate,loginWithToken]);

  useEffect(() => {
    const init = () => {
      if (typeof google === 'undefined') return;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });
    };

    if (typeof google !== 'undefined') {
      init();
    } else {
      const interval = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleGoogleCredential]);

  const handleGoogleClick = () => {
    setGoogleError(null);
    if (typeof google === 'undefined') {
      setGoogleError('Google Sign-In is not available. Check your connection.');
      return;
    }
    google.accounts.id.prompt();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Navigate to 'from' (protected page they came from) or '/'
      // RoleCheckpoint at '/' will handle the role-based redirect
      navigate(from, { replace: true });
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <img
                  src="/Untitled_design_(1).png"
                  alt="UniFreelancer"
                  className="h-12 w-auto mx-auto mb-6 group-hover:scale-105 transition-transform"
              />
            </Link>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Welcome back
            </h2>
            <p className="text-[#888888] mt-2">
              Login to your UniFreelancer account
            </p>
          </div>

          <Card className="bg-[#0a0a0a] border-[#222222] shadow-2xl">

            {/* Google Sign In Button */}
            <button
                type="button"
                onClick={handleGoogleClick}
                disabled={googleLoading || isLoading}
                className="w-full flex items-center justify-center gap-3 bg-[#111111] hover:bg-[#1a1a1a] border border-[#333333] hover:border-[#444444] text-white text-sm font-medium rounded-full px-5 py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {googleLoading ? (
                  <svg className="w-4 h-4 animate-spin text-[#888888]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
              ) : (
                  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
              )}
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {googleError && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {googleError}
                </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#222222]" />
              <span className="text-xs text-[#444444] font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-[#222222]" />
            </div>

            {/* Email / Password form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
              )}

              <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.lk"
                  required
              />

              <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[#666666]">
              Don't have an account?{' '}
              <Link to="/register" className="text-white hover:underline font-medium">
                Create one
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#222222] text-center text-xs text-[#444444]">
              <p>Demo Admin: admin@freelancehub.com / Admin@123</p>
            </div>
          </Card>
        </div>
      </div>
  );
}