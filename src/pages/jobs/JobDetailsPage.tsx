import { useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAppliedJobs } from "../../hooks/useAppliedJobs";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function JobDetailsPage() {

    const { jobId } = useParams();
    const { jobs } = useJobs();
    const { applyToJob, isApplied } = useAppliedJobs();
    const job = jobs.find(j => j.id === jobId);
    const { user } = useAuth();

    if (!job) {
        
        return <div className="p-6">Job not found</div>;
      }

      const applied = isApplied(job.id);

      return (
        <div className="max-w-4xl mx-auto p-6">
             
             <h1 className="text-3xl font-bold mb-4"> {job.title} </h1>

             <p className="text-gray-600 mb-2"> Budget: ${job.budget} </p>

             <div className="flex gap-2 mb-4">
        {job.skills.map(skill => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
             </div>


             <p className="text-gray-700 leading-relaxed">    {job.description} </p>

             
             <div className="flex flex-col sm:flex-row gap-3 mt-6">
  <button
    type="button"
    disabled={applied}
    onClick={() => applyToJob(job.id)}
    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition
      ${applied ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-black text-white hover:opacity-90"}`}
  >
    {applied ? "Applied" : "Apply Now"}
  </button>

  {user ? (
    <Link
      to={`/jobs/${job.id}/propose`}
      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
    >
      Submit Proposal
    </Link>
  ) : (
    <Link
      to="/login"
      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
    >
      Login to Submit Proposal
    </Link>
  )}

{user?.role === "client" ? (
  <Link
    to={`/jobs/${job.id}/proposals`}
    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
  >
    View Proposals
  </Link>
) : null}


        </div>

             
   

        </div>

          
      );
}