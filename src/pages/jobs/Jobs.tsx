import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../state/jobs';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import { JobCard } from '../../components/jobs/JobCard';
import { Input, Select, Button } from '../../components/ui/FormControls';
import { Search, Plus } from 'lucide-react';
import { ServiceCategory } from '../../types';
export function Jobs() {
  const {
    jobs,
    fetchJobs,
    isLoading
  } = useJobs();
  const {
    user
  } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || job.category === category;
    return matchesSearch && matchesCategory;
  });
  return <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {user?.role === 'client' ? 'Find Talent' : 'Browse Requests'}
          </h1>
          <p className="text-gray-400 mt-1">
            {user?.role === 'client' ? 'See what others are posting or create your own.' : 'Find the perfect opportunity to use your skills.'}
          </p>
        </div>

        {user?.role === 'client' && <Link to="/jobs/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post a Request
            </Button>
          </Link>}
      </div>

      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input placeholder="Search jobs..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full md:w-64">
          <Select options={[{
          value: 'all',
          label: 'All Categories'
        }, {
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
        }]} value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
      </div>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : filteredJobs.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div> : <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <h3 className="text-xl font-medium text-gray-300">No jobs found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters.
          </p>
        </div>}
    </Layout>;
}