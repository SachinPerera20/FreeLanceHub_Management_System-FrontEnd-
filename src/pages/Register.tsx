import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Button, Input, Select } from '../components/ui/FormControls';
import { Card } from '../components/ui/Cards';
import { UserRole } from '../types';
import { api } from '../lib/axios';
import { STORAGE_KEYS, writeStore } from '../lib/storage';
import { SafeUser } from '../types';

declare const google: any;

const GOOGLE_CLIENT_ID = '962166256032-k7ihoni7cj63qtmnbpqg8cs2b3sap5qn.apps.googleusercontent.com';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('CLIENT');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const [showRoleStep, setShowRoleStep] = useState(false);
  const [pendingRole, setPendingRole] = useState('CLIENT');
  const [roleLoading, setRoleLoading] = useState(false);

  const { register, loginWithToken, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // If redirected here from Login after Google auth with PENDING role
  useEffect(() => {
    if (searchParams.get('step') === 'role') {
      setShowRoleStep(true);
    }
  }, [searchParams]);

  const handleGoogleCredential = useCallback(async (response: any) => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      const res = await api.post('/auth/google', { token: response.credential });
      const token: string = res.data.token;
      const user: SafeUser = res.data.user;
      loginWithToken(token,user);

      if (user.role === 'PENDING' || user.role === 'pending') {
        // New Google user — show the role picker
        setShowRoleStep(true);
      } else {
        // Returning Google user — go to '/' and let RoleCheckpoint decide
        navigate('/');
      }
    } catch (err) {
      setGoogleError('Google sign-up failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  }, [navigate,loginWithToken]);

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

  // Called after Google auth — saves chosen role then goes to '/'
  // RoleCheckpoint handles the final redirect to the right dashboard
  const handleRoleConfirm = async () => {
    setRoleLoading(true);
    try {
      const res = await api.patch('/auth/update-role', { role: pendingRole });
      const updatedUser: SafeUser = res.data;
      writeStore(STORAGE_KEYS.CURRENT_USER, updatedUser);
      navigate('/');
    } catch (err) {
      setGoogleError('Failed to set your role. Please try again.');
    } finally {
      setRoleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      // Error handled by hook
    }
  };

  // ── Role selection step (shown after Google sign-up) ──────────────────
  if (showRoleStep) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none" />

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
                One last step
              </h2>
              <p className="text-[#888888] mt-2">
                How do you want to use UniFreelancer?
              </p>
            </div>

            <Card className="bg-[#0a0a0a] border-[#222222] shadow-2xl">
              {googleError && (
                  <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {googleError}
                  </div>
              )}

              <div className="space-y-3 mb-6">
                {/* Client option */}
                <button
                    type="button"
                    onClick={() => setPendingRole('CLIENT')}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        pendingRole === 'CLIENT'
                            ? 'border-[#f97316] bg-[#f97316]/5'
                            : 'border-[#222222] bg-[#111111] hover:border-[#333333]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        pendingRole === 'CLIENT' ? 'border-[#f97316]' : 'border-[#444444]'
                    }`}>
                      {pendingRole === 'CLIENT' && (
                          <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Hire Talent</p>
                      <p className="text-[#666666] text-xs mt-0.5">Post jobs and find skilled freelancers</p>
                    </div>
                  </div>
                </button>

                {/* Freelancer option */}
                <button
                    type="button"
                    onClick={() => setPendingRole('FREELANCER')}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        pendingRole === 'FREELANCER'
                            ? 'border-[#f97316] bg-[#f97316]/5'
                            : 'border-[#222222] bg-[#111111] hover:border-[#333333]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        pendingRole === 'FREELANCER' ? 'border-[#f97316]' : 'border-[#444444]'
                    }`}>
                      {pendingRole === 'FREELANCER' && (
                          <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Offer Services</p>
                      <p className="text-[#666666] text-xs mt-0.5">Find work and earn by offering your skills</p>
                    </div>
                  </div>
                </button>
              </div>

              <Button
                  type="button"
                  className="w-full"
                  isLoading={roleLoading}
                  onClick={handleRoleConfirm}
              >
                Get Started
              </Button>
            </Card>
          </div>
        </div>
    );
  }

  // ── Main Register form ─────────────────────────────────────────────────
  return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none" />

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
              Create Account
            </h2>
            <p className="text-[#888888] mt-2">
              Join the UniFreelancer community
            </p>
          </div>

          <Card className="bg-[#0a0a0a] border-[#222222] shadow-2xl">

            {/* Google Sign Up Button */}
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
              {googleLoading ? 'Signing up...' : 'Continue with Google'}
            </button>

            {googleError && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {googleError}
                </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#222222]" />
              <span className="text-xs text-[#444444] font-medium">or sign up with email</span>
              <div className="flex-1 h-px bg-[#222222]" />
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
              )}

              <Input
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
              />

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

              <Select
                  label="I want to..."
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  options={[
                    { value: 'CLIENT', label: 'Hire Talent (Client)' },
                    { value: 'FREELANCER', label: 'Offer Services (Freelancer)' },
                  ]}
              />

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[#666666]">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </Card>
        </div>
      </div>
  );
}