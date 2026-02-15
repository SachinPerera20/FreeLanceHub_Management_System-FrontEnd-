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

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Link to="/jobs" className="underline text-blue-600">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const isOwner = !!user && user.id === job.createdBy;
  const applied = isApplied(job.id);

  const redirectToFreelancerRegister = (intent: NavState["intent"]) => {
    const state: NavState = {
      intent,
      forceRole: "freelancer",
      from: location.pathname,
      jobId: job.id,
    };
    navigate("/register", { state });
  };

  const handleApplyClick = () => {
    // ✅ Apply button stays visible, but client/non-auth gets redirected
    if (!user || user.role !== "freelancer") {
      redirectToFreelancerRegister("apply");
      return;
    }
    if (applied) return;
    applyToJob(job.id);
  };

  const handleProposalClick = () => {
    // ✅ Clients cannot submit proposals
    if (!user || user.role !== "freelancer") {
      redirectToFreelancerRegister("proposal");
      return;
    }
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
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill} className="rounded-full border bg-white px-3 py-1 text-sm">
              {skill}
            </span>
          ))}
        </div>

        <p className="mt-5 text-zinc-700 leading-relaxed">{job.description}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {/* ✅ Apply visible (even for clients), but controlled on click */}
          {!isOwner ? (
            <button
              onClick={handleApplyClick}
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

          {/* ✅ Submit Proposal: visible but also controlled */}
          {!isOwner ? (
            <button
              onClick={handleProposalClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition bg-zinc-100 hover:bg-zinc-200"
            >
              Submit Proposal
            </button>
          ) : null}

          {isOwner ? (
            <Link
              to={`/jobs/${job.id}/proposals`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition bg-blue-600 text-white hover:opacity-90 text-center"
            >
              View Proposals
            </Link>
          ) : null}
        </div>

        {!isOwner && user?.role === "client" ? (
          <p className="mt-3 text-sm text-zinc-600">
            To apply or submit proposals, you must login/register as a <b>freelancer</b>.
          </p>
        ) : null}
      </div>
    </div>
  );
}
