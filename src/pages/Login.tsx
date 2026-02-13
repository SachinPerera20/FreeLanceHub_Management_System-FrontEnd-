import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
  
export default function Login() {

    const { login, isLoading, error, clearError } = useAuth();
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login({ email, password });
            navigate('/profile'); // redirect after successful login
          }

          catch {
            // error handled in context
          }

};

return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

    <form onSubmit={handleSubmit} className="space-y-4">

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

    </form>

    
    </div>
);
}