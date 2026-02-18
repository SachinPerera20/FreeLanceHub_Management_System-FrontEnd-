import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Button, Input, Select } from '../components/ui/FormControls';
import { Card } from '../components/ui/Cards';
import { UserRole } from '../types';
export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const {
    register,
    isLoading,
    error
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      navigate('/');
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
            Create Account
          </h2>
          <p className="text-[#888888] mt-2">
            Join the UniFreelancer community
          </p>
        </div>

        <Card className="bg-[#0a0a0a] border-[#222222] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>}

            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />

            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@university.lk" required />

            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />

            <Select label="I want to..." value={role} onChange={(e) => setRole(e.target.value as UserRole)} options={[{
            value: 'client',
            label: 'Hire Talent (Client)'
          }, {
            value: 'freelancer',
            label: 'Offer Services (Freelancer)'
          }]} />

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
    </div>;
}