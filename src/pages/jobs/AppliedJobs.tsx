import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../../state/jobs";
import { useAuth } from "../../state/auth";
import { useAppliedSaved } from "../../state/appliedSaved";
import { Layout } from "../../components/ui/Layout";
import { JobCard } from "../../components/jobs/JobCard";
import { StatusBadge } from "../../components/ui/Badges";
import { Card, CardContent } from "../../components/ui/Cards";
import { proposalsService } from "../../services/proposals.service";
import { Proposal, Job } from "../../types";
import { DollarSign, Clock, ExternalLink, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
export function AppliedJobs() {
  const { jobs, fetchJobs, isLoading: jobsLoading } = useJobs();
  const { user } = useAuth();
  const { appliedJobs } = useAppliedSaved();
  const [freelancerProposals, setFreelancerProposals] = useState<Proposal[]>(
    [],
  );
  const [proposalsLoading, setProposalsLoading] = useState(false);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  useEffect(() => {
    const loadProposals = async () => {
      if (!user) return;
      setProposalsLoading(true);
      const proposals = await proposalsService.listByFreelancer(user.id);
      setFreelancerProposals(proposals);
      setProposalsLoading(false);
    };
    loadProposals();
  }, [user]);
  // Merge applied job IDs from both sources (appliedJobs list + proposals)
  const proposalJobIds = freelancerProposals.map((p) => p.jobId);
  const allAppliedJobIds = [...new Set([...appliedJobs, ...proposalJobIds])];
  const appliedJobsList = jobs.filter((job) =>
    allAppliedJobIds.includes(job.id),
  );
  // Helper to get proposal for a job
  const getProposalForJob = (jobId: string) =>
    freelancerProposals.find((p) => p.jobId === jobId);
  const isLoading = jobsLoading || proposalsLoading;
  return (
    <Layout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Applied Jobs</h1>
          <p className="text-gray-400 mt-1">
            Jobs you've submitted proposals for
          </p>
        </div>
        {appliedJobsList.length > 0 && (
          <span className="text-sm text-gray-500">
            {appliedJobsList.length} application
            {appliedJobsList.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : appliedJobsList.length > 0 ? (
        <div className="space-y-4">
          {appliedJobsList.map((job) => {
            const proposal = getProposalForJob(job.id);
            return (
              <Card
                key={job.id}
                className="hover:border-gray-700 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Job Info */}
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <StatusBadge status={job.status} />
                        {proposal && <StatusBadge status={proposal.status} />}
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
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          Budget: LKR {job.budget.toLocaleString()}
                        </span>
                        {proposal && (
                          <>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-[#f97316]" />
                              <span className="text-[#f97316]">
                                Your Bid: LKR{" "}
                                {proposal.bidAmount.toLocaleString()}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {proposal.estimatedDays} days
                            </span>
                            <span>
                              Applied{" "}
                              {formatDistanceToNow(
                                new Date(proposal.submittedAt),
                                {
                                  addSuffix: true,
                                },
                              )}
                            </span>
                          </>
                        )}
                      </div>
                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {job.skills.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="text-[10px] text-gray-600">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Action */}
                    <div className="flex items-center p-5 md:border-l border-t md:border-t-0 border-gray-800">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#111827]/30 rounded-xl border border-gray-800 border-dashed">
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-300">
            No applications yet
          </h3>
          <p className="text-gray-500 mt-2 mb-6">
            Start browsing jobs and apply to them.
          </p>
          <Link
            to="/jobs"
            className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
          >
            Browse Jobs →
          </Link>
        </div>
      )}
    </Layout>
  );
}
