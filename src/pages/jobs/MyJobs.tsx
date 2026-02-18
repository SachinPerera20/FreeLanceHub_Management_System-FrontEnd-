import React, { useEffect } from 'react';
import { useJobs } from '../../state/jobs';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import { JobCard } from '../../components/jobs/JobCard';
import { Button } from '../../components/ui/FormControls';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
export function MyJobs() {
  const {
    jobs,
    fetchJobs,
    isLoading
  } = useJobs();
  const {
    user
  } = useAuth();
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  // Filter jobs created by current user
  const myJobs = jobs.filter((job) => job.createdBy === user?.id);
  return <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Requests</h1>
        <Link to="/jobs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post New Request
          </Button>
        </Link>
      </div>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : myJobs.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div> : <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <h3 className="text-xl font-medium text-gray-300">
            No requests posted yet
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            Create your first request to find talent.
          </p>
          <Link to="/jobs/create">
            <Button>Post a Request</Button>
          </Link>
        </div>}
    </Layout>;
}