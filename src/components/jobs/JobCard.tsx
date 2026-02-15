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

  const jobWithStatus = job as MockJob & { status?: string };

  return (
    <button
      type="button"
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="group w-full text-left"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-zinc-950/10
        bg-gradient-to-b from-white/95 via-white/80 to-zinc-50/70 backdrop-blur-xl
        shadow-[0_14px_40px_rgba(0,0,0,0.10)]
        transition-all duration-300 ease-out transform-gpu
        hover:-translate-y-1.5 hover:shadow-[0_22px_70px_rgba(0,0,0,0.16)]
        hover:border-zinc-950/15"
      >
        {/* subtle header-style highlight strip */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        {/* soft ink wash to echo header tone */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
          bg-gradient-to-b from-black/8 via-transparent to-transparent"
        />

        {/* Hover aura (matches layout corner glow) */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100
          bg-gradient-to-r from-indigo-200/55 via-transparent to-cyan-200/55 blur-2xl"
        />

        {/* Premium shine sweep */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent
            skew-x-12 translate-x-0 group-hover:translate-x-[250%] transition-transform duration-700 ease-out"
          />
        </div>

        <div className="relative p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                {job.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Posted by{" "}
                <span className="font-medium text-zinc-700">
                  {job.clientName}
                </span>
              </p>
            </div>

            {typeof jobWithStatus.status === "string" ? (
              <span
                className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusTone(
                  jobWithStatus.status
                )}`}
              >
                {jobWithStatus.status}
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
              Budget:{" "}
              <span className="font-semibold text-zinc-900">
                ${job.budget}
              </span>
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
