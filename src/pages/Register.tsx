import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function Register() {

    const { register, isLoading, error, clearError } = useAuth();
    const navigate = useNavigate();
  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'client' | 'freelancer'>('freelancer');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await register({ name, email, password, role });
            navigate('/profile');
          }
        
          catch {
            // error handled in context
          }

          return (
            <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required />

         <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> 

          <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

         <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="freelancer"
              checked={role === 'freelancer'}
              onChange={() => setRole('freelancer')}
            />
            Freelancer
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="client"
              checked={role === 'client'}
              onChange={() => setRole('client')}
            />
            Client
          </label>
        </div>

        </form>


                </div>
          );
    
}