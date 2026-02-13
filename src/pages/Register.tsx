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
    
}