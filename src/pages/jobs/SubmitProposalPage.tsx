import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAuth } from "../../hooks/useAuth";
import { useProposals } from "../../context/ProposalsContext";

export default function SubmitProposalPage() {

    const { id } = useParams(); 
    const navigate = useNavigate();
  
    const { jobs } = useJobs();
    const { user } = useAuth();
    const { addProposal } = useProposals();
  
    const job = useMemo(() => jobs.find((j) => j.id === id), [jobs, id]);
  
    const [coverLetter, setCoverLetter] = useState("");
    const [proposedBudget, setProposedBudget] = useState<number>(job?.budget ?? 0);
    const [estimatedDays, setEstimatedDays] = useState<number>(7);
    const [error, setError] = useState<string>("");

    if (!id) return <div className="p-6">Invalid job</div>;
  if (!job) return <div className="p-6">Job not found</div>;
  if (!user) return <div className="p-6">Please login to submit a proposal.</div>;

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
}
addProposal({
    jobId: job.id,
    freelancerId: user.id,
    freelancerName: user.name,
    coverLetter: coverLetter.trim(),
    proposedBudget,
    estimatedDays,
  });

  navigate(`/jobs/${job.id}`);
};

