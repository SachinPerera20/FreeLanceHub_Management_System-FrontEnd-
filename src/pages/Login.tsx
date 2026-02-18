import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Button, Input } from '../components/ui/FormControls';
import { Card } from '../components/ui/Cards';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login,
    isLoading,
    error
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, {
        replace: true
      });
    } catch (err) {

      // Error handled by hook
    }};
  return <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <img src="/Untitled_design_(1).png" alt="UniFreelancer" className="h-12 w-auto mx-auto mb-6 group-hover:scale-105 transition-transform" />
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-[#888888] mt-2">
            Login to your UniFreelancer account
          </p>
        </div>

        <Card className="bg-[#0a0a0a] border-[#222222] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>}

            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.lk" required />

            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

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
    </div>;
}