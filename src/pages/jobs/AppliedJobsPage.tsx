import { Link } from "react-router-dom";
import { useAppliedJobs } from "../../hooks/useAppliedJobs";
import { useJobs } from "../../hooks/useJobs";

export default function AppliedJobsPage() {
  const { appliedJobIds, removeApplication } = useAppliedJobs();
  const { jobs } = useJobs();

  const appliedJobs = jobs.filter((j) => appliedJobIds.includes(j.id));

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Applied Jobs</h1>

          <Link
            to="/jobs"
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Back to Jobs
          </Link>
        </div>

        {/* Content */}
        {appliedJobs.length === 0 ? (
          <div className="border rounded-2xl p-6 bg-gray-50 text-gray-700">
            You haven’t applied to any jobs yet.
          </div>
        ) : (
          <div className="space-y-4">
            {appliedJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-gray-900">{job.title}</p>
                  <p className="text-sm text-gray-600">Rs. {job.budget}</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeApplication(job.id)}
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
