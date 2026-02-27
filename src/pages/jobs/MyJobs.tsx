import React, { useEffect, useState } from "react";
import { useJobs } from "../../state/jobs";
import { useAuth } from "../../state/auth";
import { useProposals } from "../../state/proposals";
import { Layout } from "../../components/ui/Layout";
import { JobCard } from "../../components/jobs/JobCard";
import { Card, CardContent } from "../../components/ui/Cards";
import { Button } from "../../components/ui/FormControls";
import { StatusBadge, CategoryBadge } from "../../components/ui/Badges";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { proposalsService } from "../../services/proposals.service";
import { Proposal } from "../../types";
export function MyJobs() {
  const { jobs, fetchJobs, deleteJob, isLoading } = useJobs();
  const { user } = useAuth();
  const [proposalCounts, setProposalCounts] = useState<Record<string, number>>(
    {},
  );
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  const myJobs = jobs.filter((job) => job.createdBy === user?.id);
  useEffect(() => {
    const loadCounts = async () => {
      const counts: Record<string, number> = {};
      for (const job of myJobs) {
        const proposals = await proposalsService.listByJob(job.id);
        counts[job.id] = proposals.length;
      }
      setProposalCounts(counts);
    };
    if (myJobs.length > 0) loadCounts();
  }, [myJobs.length]);
  const handleDelete = async (jobId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job? This action cannot be undone.",
      )
    )
      return;
    try {
      await deleteJob(jobId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Requests</h1>
        <Link to="/jobs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Post New Request
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : myJobs.length > 0 ? (
        <div className="space-y-4">
          {myJobs.map((job) => {
            const canDelete = job.status === "open";
            return (
              <Card
                key={job.id}
                className="hover:border-gray-700 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryBadge category={job.category} />
                        <StatusBadge status={job.status} />
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-lg font-bold text-white hover:text-teal-400 transition-colors"
                      >
                        {job.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="text-teal-400 font-medium">
                          LKR {job.budget.toLocaleString()}
                        </span>
                        <span>{proposalCounts[job.id] || 0} proposals</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-5 md:border-l border-t md:border-t-0 border-gray-800">
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      {canDelete ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(job.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-600 whitespace-nowrap">
                          Can't delete
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <h3 className="text-xl font-medium text-gray-300">
            No requests posted yet
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            Create your first request to find talent.
          </p>
          <Link to="/jobs/create">
            <Button>Post a Request</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
}
