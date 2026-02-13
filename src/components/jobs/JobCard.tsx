import type { MockJob } from '../../mocks/jobs.mock';
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate();

type JobCardProps = {
  job: MockJob;
};

function formatTimeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="h-full rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col">

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-7 min-h-[56px]">
        {job.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-5 min-h-[40px]">
        {job.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[32px] overflow-hidden">
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between text-sm text-gray-500">

        <span>Rs. {job.budget}</span>
        <span>{formatTimeAgo(job.createdAt)}</span>
      </div>
    </div>
  );
}
