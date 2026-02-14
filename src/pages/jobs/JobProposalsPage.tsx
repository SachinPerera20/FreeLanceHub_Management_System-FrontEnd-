import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { useProposals } from "../../context/ProposalsContext";

export default function JobProposalsPage() {

    const { jobId } = useParams();
    const navigate = useNavigate();
  
    const { user } = useAuth();
    const { jobs } = useJobs();
    const { getProposalsByJobId } = useProposals();
  
    const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);
  
    const proposals = useMemo(() => {
      if (!jobId) return [];
      return getProposalsByJobId(jobId);
    }, [jobId, getProposalsByJobId]);

    if (!jobId) return <div className="p-6">Invalid job</div>;
    if (!job) return <div className="p-6">Job not found</div>;


}