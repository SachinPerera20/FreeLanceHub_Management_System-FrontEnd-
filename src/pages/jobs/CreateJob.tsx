import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../state/jobs';
import { Layout } from '../../components/ui/Layout';
import { Button, Input, Textarea, Select } from '../../components/ui/FormControls';
import { Card } from '../../components/ui/Cards';
import { ServiceCategory } from '../../types';
export function CreateJob() {
  const navigate = useNavigate();
  const {
    createJob,
    isLoading
  } = useJobs();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Assignment Help');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJob({
        title,
        description,
        category,
        budget: Number(budget),
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean)
      });
      navigate('/jobs/my');
    } catch (error) {
      console.error(error);
    }
  };
  return <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Post a New Request
        </h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Project Title" placeholder="e.g. Need help with React Assignment" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Category" options={[{
              value: 'Assignment Help',
              label: 'Assignment Help'
            }, {
              value: 'Project Support',
              label: 'Project Support'
            }, {
              value: 'Tutoring',
              label: 'Tutoring'
            }, {
              value: 'Notes',
              label: 'Notes'
            }, {
              value: 'Design/Slides',
              label: 'Design/Slides'
            }, {
              value: 'Other',
              label: 'Other'
            }]} value={category} onChange={(e) => setCategory(e.target.value as ServiceCategory)} />

              <Input label="Budget (LKR)" type="number" placeholder="5000" value={budget} onChange={(e) => setBudget(e.target.value)} required min="0" />
            </div>

            <Textarea label="Description" placeholder="Describe what you need help with in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={6} />

            <Input label="Required Skills (comma separated)" placeholder="e.g. React, TypeScript, Mathematics" value={skills} onChange={(e) => setSkills(e.target.value)} />

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Post Request
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>;
}