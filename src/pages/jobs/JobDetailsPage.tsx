import { useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";

export default function JobDetailsPage() {

    const { jobId } = useParams();
    const { jobs } = useJobs();
    const job = jobs.find(j => j.id === jobId);

    if (!job) {
        return <div className="p-6">Job not found</div>;
      }

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

             
        </div>

          
      );
}