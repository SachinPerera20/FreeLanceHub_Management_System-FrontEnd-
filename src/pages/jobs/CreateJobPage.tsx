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
      clientName: user.name,
    };

    addJob(newJob);

    navigate('/jobs');
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">Create New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Job Description"
          className="w-full border rounded px-3 py-2"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Budget"
          className="w-full border rounded px-3 py-2"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
      </div>
    </div>
  );
}
