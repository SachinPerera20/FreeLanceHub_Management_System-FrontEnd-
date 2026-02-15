import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAppliedJobs } from "../../hooks/useAppliedJobs";
import { useAuth } from "../../hooks/useAuth";

type NavState = {
  intent?: "apply" | "proposal";
  forceRole?: "freelancer";
  from?: string;
  jobId?: string;
};

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { jobs } = useJobs();
  const { applyToJob, isApplied } = useAppliedJobs();
  const { user } = useAuth();

  const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Link to="/jobs" className="text-blue-600 underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const isOwner = !!user && user.id === job.createdBy;
  const applied = isApplied(job.id);

  const redirectToFreelancerAuth = (intent: NavState["intent"]) => {
    const state: NavState = {
      intent,
      forceRole: "freelancer",
      from: location.pathname,
      jobId: job.id,
    };
    // Requirement: redirect to register to force freelancer register/login
    navigate("/register", { state });
  };

  const onApplyClick = () => {
    // keep button visible, but block client/non-auth
    if (!user) return redirectToFreelancerAuth("apply");
    if (user.role !== "freelancer") return redirectToFreelancerAuth("apply");
    if (applied) return;

    applyToJob(job.id);
  };

  const onProposalClick = () => {
    if (!user) return redirectToFreelancerAuth("proposal");
    if (user.role !== "freelancer") return redirectToFreelancerAuth("proposal");

    navigate(`/jobs/${job.id}/submit-proposal`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="rounded-2xl border bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">{job.title}</h1>

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Budget: <b>${job.budget}</b>
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Client: <b>{job.clientName}</b>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border px-3 py-1 text-sm bg-white"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-5 text-zinc-700 leading-relaxed">{job.description}</p>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {/* Apply button is visible even for clients (requirement), but blocked on click */}
          {!isOwner ? (
            <button
              onClick={onApplyClick}
              className={[
                "w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition",
                applied
                  ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                  : "bg-black text-white hover:opacity-90",
              ].join(" ")}
            >
              {applied ? "Applied" : "Apply Now"}
            </button>
          ) : null}

          {/* Submit proposal: also blocked for clients */}
          {!isOwner ? (
            <button
              onClick={onProposalClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition bg-zinc-100 hover:bg-zinc-200"
            >
              Submit Proposal
            </button>
          ) : null}

          {/* Owner can view proposals */}
          {isOwner ? (
            <Link
              to={`/jobs/${job.id}/proposals`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition bg-blue-600 text-white hover:opacity-90 text-center"
            >
              View Proposals
            </Link>
          ) : null}
        </div>

        {/* Small helper note for clients */}
        {!isOwner && user?.role === "client" ? (
          <p className="mt-3 text-sm text-zinc-600">
            To apply or submit a proposal, you must be logged in as a{" "}
            <b>freelancer</b>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
