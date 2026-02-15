import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAuth } from "../../hooks/useAuth";
import { useProposals } from "../../context/ProposalsContext";

type NavState = {
  intent?: "apply" | "proposal";
  forceRole?: "freelancer";
  from?: string;
  jobId?: string;
};

export default function SubmitProposalPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { jobs } = useJobs();
  const { user } = useAuth();
  const { addProposal } = useProposals();

  const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);

  const [coverLetter, setCoverLetter] = useState("");
  const [proposedBudget, setProposedBudget] = useState(() => job?.budget ?? 0);
  const [estimatedDays, setEstimatedDays] = useState(7);
  const [error, setError] = useState("");

  const redirectToFreelancerRegister = () => {
    const state: NavState = {
      intent: "proposal",
      forceRole: "freelancer",
      from: location.pathname,
      jobId: jobId,
    };
    navigate("/register", { state });
  };

  if (!jobId) return <div className="p-6">Invalid job</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  // ✅ Block non-freelancer users without navigating during render
  if (!user || user.role !== "freelancer") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Submit Proposal</h1>
        <p className="mt-2 text-zinc-700">
          You must login/register as a <b>freelancer</b> to submit proposals.
        </p>
        <button
          onClick={redirectToFreelancerRegister}
          className="mt-5 px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90"
        >
          Go to Freelancer Register/Login
        </button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (coverLetter.trim().length < 20) {
      setError("Cover letter should be at least 20 characters.");
      return;
    }
    if (proposedBudget <= 0) {
      setError("Proposed budget must be greater than 0.");
      return;
    }
    if (estimatedDays <= 0) {
      setError("Estimated days must be greater than 0.");
      return;
    }

    // ✅ Do NOT send freelancerId/name — context will inject from auth
    addProposal({
      jobId: job.id,
      coverLetter: coverLetter.trim(),
      proposedBudget,
      estimatedDays,
    });

    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold">Submit Proposal</h1>
      <p className="mt-2 text-zinc-600">
        Job: <b className="text-zinc-900">{job.title}</b>
      </p>

      <div className="mt-6 rounded-2xl border bg-white/90 p-6">
        {error ? (
          <div className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-rose-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Write a short message explaining why you're a good fit..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Proposed Budget ($)</label>
              <input
                type="number"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estimated Days</label>
              <input
                type="number"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                min={1}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90">
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg bg-zinc-100 hover:bg-zinc-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
