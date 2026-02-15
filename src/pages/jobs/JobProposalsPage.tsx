import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { useProposals } from "../../hooks/useProposals";
import { useContracts } from "../../context/ContractsContext";


export default function JobProposalsPage() {

    const { jobId } = useParams();
    const navigate = useNavigate();
  
    const { user } = useAuth();
    const { jobs, updateJobStatus } = useJobs();
    const { getProposalsByJobId, updateProposalStatus } = useProposals();
    const { addContract } = useContracts();
    const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);
  
    const proposals = useMemo(() => {
      if (!jobId) return [];
      return getProposalsByJobId(jobId);
    }, [jobId, getProposalsByJobId]);

    

    if (!jobId) return <div className="p-6">Invalid job</div>;
    if (!job) return <div className="p-6">Job not found</div>;

    const isOwner = !!user && user.id === job.createdBy;

if (!isOwner) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white border rounded-xl p-6 space-y-3">
        <h1 className="text-xl font-bold">Access denied</h1>
        <p className="text-gray-600">
          Only the job owner can view proposals for this job.
        </p>
        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-sm"
        >
          ← Back to Job
        </Link>
      </div>
    </div>
  );
}

const acceptProposal = (proposalId: string) => {
    const selected = proposals.find((p) => p.id === proposalId);
    if (!selected) return;
  
    // 1) update proposal statuses (accepted + auto-reject others)
    updateProposalStatus(proposalId, "accepted");
  
    // 2) create contract
    addContract({
      jobId: job.id,
      proposalId: selected.id,
      clientId: user!.id,
      freelancerId: selected.freelancerId,
      clientName: user!.name,
      freelancerName: selected.freelancerName,
  
      title: job.title,
      description: job.description,
      totalAmount: selected.proposedBudget,
      startDate: new Date().toISOString(),
    });
  
    // 3) update job status
    updateJobStatus(job.id, "in_progress");
  };
  


    if (!user) {
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white border rounded-xl p-6 space-y-4">
              <h1 className="text-xl font-bold">View Proposals</h1>
              <p className="text-gray-600">Please login to view proposals.</p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90"
              >
                Go to Login
              </button>
            </div>
          </div>
        );
      }

      return (

        <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Proposals</h1>
              <p className="text-sm text-gray-600 mt-1">
                Job: <span className="font-medium text-gray-900">{job.title}</span>
              </p>
            </div>
  
            <Link
              to={`/jobs/${job.id}`}
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              ← Back
            </Link>
          </div>
  
          {proposals.length === 0 ? (
            <div className="rounded-lg bg-gray-50 border p-4 text-gray-700">
              No proposals yet.
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map((p) => (
                <div key={p.id} className="border rounded-xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold">{p.freelancerName}</p>
                      <p className="text-sm text-gray-600">
                        Budget: <span className="font-medium">${p.proposedBudget}</span> •{" "}
                        {p.estimatedDays} days • Status:{" "}
                        <span className="font-medium">{p.status}</span>
                      </p>
                    </div>
  
                    <span className="text-xs text-gray-500">
                      {new Date(p.createdAt).toLocaleString()}
                    </span>
                  </div>
  
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {p.coverLetter}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
     <button
    type="button"
    onClick={() => acceptProposal(p.id)}
    disabled={p.status === "accepted"}
    className={`px-4 py-2 rounded-lg font-semibold text-sm transition
      ${p.status === "accepted"
        ? "bg-green-100 text-green-700 cursor-not-allowed"
        : "bg-green-600 text-white hover:opacity-90"
      }`}
     >
    {p.status === "accepted" ? "Accepted" : "Accept"}
    </button>

     <button
    type="button"
    onClick={() => updateProposalStatus(p.id, "rejected")}
    disabled={p.status === "rejected"}
    className={`px-4 py-2 rounded-lg font-semibold text-sm transition
      ${p.status === "rejected"
        ? "bg-red-100 text-red-700 cursor-not-allowed"
        : "bg-red-600 text-white hover:opacity-90"
      }`}
  >
    {p.status === "rejected" ? "Rejected" : "Reject"}
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