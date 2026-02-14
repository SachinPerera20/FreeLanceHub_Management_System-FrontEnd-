import { useMemo, useState } from 'react';
import { useJobs } from '../../hooks/useJobs';
import JobCard from '../../components/jobs/JobCard';
import { Link } from "react-router-dom";


export default function JobListPage() {
  const [search, setSearch] = useState('');
  const { jobs } = useJobs();
  const filteredJobs = useMemo(() => {
    const lower = search.toLowerCase();

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lower) ||
        job.description.toLowerCase().includes(lower) ||
        job.skills.some((skill) => skill.toLowerCase().includes(lower))
    );
  }, [search,jobs]);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-start justify-between">
  <div>
    <h1 className="text-2xl font-semibold text-gray-900">
      Browse Jobs
    </h1>
    <p className="text-sm text-gray-600">
      Find opportunities that match your skills.
    </p>
  </div>

  <Link
    to="/jobs/applied"
    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold transition"
  >
    Applied Jobs
  </Link>
</div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search by title, description, or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-center text-gray-600">
          No jobs found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
