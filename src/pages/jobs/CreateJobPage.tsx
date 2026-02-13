import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { useAuth } from '../../hooks/useAuth';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const newJob = {
      id: Date.now().toString(),
      title,
      description,
      budget: Number(budget),
      skills: [],
      createdAt: new Date().toISOString(),
      clientId: user.id,

  }
};
addJob(newJob);

    navigate('/jobs');
  };

