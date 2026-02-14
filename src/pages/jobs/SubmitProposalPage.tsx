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

}