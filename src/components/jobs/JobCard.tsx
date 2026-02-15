import { useNavigate } from "react-router-dom";
import type { MockJob } from "../../mocks/jobs.mock";

type Props = {
  job: MockJob;
};

function statusTone(status?: string) {
  if (!status) return "bg-zinc-100 text-zinc-700";
  if (status === "open") return "bg-emerald-100 text-emerald-800";
  if (status === "in_progress") return "bg-amber-100 text-amber-800";
  if (status === "completed") return "bg-sky-100 text-sky-800";
  if (status === "cancelled") return "bg-rose-100 text-rose-800";
  return "bg-zinc-100 text-zinc-700";
}

export default function JobCard({ job }: Props) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="group w-full text-left"
    >
          <div
     className="relative overflow-hidden rounded-2xl border border-zinc-200 
                bg-gradient-to-b from-white to-zinc-50 
                shado w-sm 
                transition-all duration-300 ease-out 
                hover:-translate-y-1.5 
                hover:shadow-2xl hover:shadow-black/15 
                hover:border-zinc-300 
                group"
          >
        {/* Shine */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-zinc-200/40 blur-3xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100
          bg-[linear-gradient(110deg,transparent,rgba(0,0,0,0.03),transparent)]"
        />

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                {job.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Posted by <span className="font-medium text-zinc-700">{job.clientName}</span>
              </p>
            </div>

            {/* Status pill (if your MockJob has status) */}
            {typeof (job as MockJob & { status?: string }).status === "string" ? (
  <span
    className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusTone(
      (job as MockJob & { status?: string }).status
    )}`}
  >
    {(job as MockJob & { status?: string }).status}
  </span>
) : null}

          </div>

          <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-zinc-600">
              Budget: <span className="font-semibold text-zinc-900">${job.budget}</span>
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              View
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
