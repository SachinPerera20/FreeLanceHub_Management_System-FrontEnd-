import React, { useEffect } from 'react';
import { useJobs } from '../../state/jobs';
import { useAppliedSaved } from '../../state/appliedSaved';
import { Layout } from '../../components/ui/Layout';
import { JobCard } from '../../components/jobs/JobCard';
export function AppliedJobs() {
  const {
    jobs,
    fetchJobs,
    isLoading
  } = useJobs();
  const {
    appliedJobs
  } = useAppliedSaved();
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  const appliedJobsList = jobs.filter((job) => appliedJobs.includes(job.id));
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Applied Jobs</h1>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : appliedJobsList.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobsList.map((job) => <JobCard key={job.id} job={job} />)}
        </div> : <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <h3 className="text-xl font-medium text-gray-300">
            No applications yet
          </h3>
          <p className="text-gray-500 mt-2">
            Start browsing jobs and apply to them.
          </p>
        </div>}
    </Layout>;
}