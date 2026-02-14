import { useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";

export default function JobDetailsPage() {

    const { jobId } = useParams();
    const { jobs } = useJobs();
    const job = jobs.find(j => j.id === jobId);

}