import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../state/jobs';
import { useAuth } from '../../state/auth';
import { useProposals } from '../../state/proposals';
import { useAppliedSaved } from '../../state/appliedSaved';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { StatusBadge, CategoryBadge } from '../../components/ui/Badges';
import { ProposalModal } from '../../components/jobs/ProposalModal';
import { ProposalList } from '../../components/jobs/ProposalList';
import { DollarSign, Clock, Calendar, Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
export function JobDetails() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    currentJob,
    fetchJobById,
    isLoading: jobLoading
  } = useJobs();
  const {
    user
  } = useAuth();
  const {
    proposals,
    fetchProposalsByJob,
    acceptProposal,
    rejectProposal,
    isLoading: proposalsLoading
  } = useProposals();
  const {
    savedJobs,
    saveJob,
    unsaveJob,
    appliedJobs,
    applyToJob,
    isApplied
  } = useAppliedSaved();
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  useEffect(() => {
    if (id) {
      fetchJobById(id);
      fetchProposalsByJob(id);
    }
  }, [id, fetchJobById, fetchProposalsByJob]);
  if (jobLoading || !currentJob) {
    return <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>;
  }
  const isOwner = user?.id === currentJob.createdBy;
  const isFreelancer = user?.role === 'freelancer';
  const isSaved = savedJobs.includes(currentJob.id);
  const hasApplied = isApplied(currentJob.id);
  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveJob(currentJob.id);
    } else {
      saveJob(currentJob.id);
    }
  };
  const handleProposalSubmit = () => {
    setIsProposalModalOpen(true);
  };
  return <Layout>
      <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-teal-400" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={currentJob.category} />
                    <StatusBadge status={currentJob.status} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {currentJob.title}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Posted{' '}
                    {format(new Date(currentJob.createdAt), 'MMM d, yyyy')} by{' '}
                    {currentJob.createdByName || 'Unknown'}
                  </p>
                </div>
                {isFreelancer && <button onClick={handleSaveToggle} className={`p-2 rounded-full transition-colors ${isSaved ? 'text-teal-400 bg-teal-900/20' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}>
                    {isSaved ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                  </button>}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-300 whitespace-pre-wrap">
                  {currentJob.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.skills.map((skill) => <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">
                      {skill}
                    </span>)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposals Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Proposals ({proposals.length})
            </h2>

            {isOwner ? <ProposalList proposals={proposals} onAccept={acceptProposal} onReject={rejectProposal} isOwner={true} /> :
          // For freelancers/public: only show their own proposal or nothing
          <div className="bg-[#111827]/30 border border-gray-800 rounded-xl p-6 text-center text-gray-500">
                {hasApplied ? 'You have submitted a proposal for this job.' : 'Proposals are private and only visible to the client.'}
              </div>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Budget</span>
                <span className="text-xl font-bold text-teal-400">
                  LKR {currentJob.budget.toLocaleString()}
                </span>
              </div>

              {isFreelancer && currentJob.status === 'open' && !hasApplied && <Button className="w-full" size="lg" onClick={handleProposalSubmit}>
                  Apply Now
                </Button>}

              {isFreelancer && hasApplied && <Button className="w-full" variant="secondary" disabled>
                  Applied
                </Button>}

              {currentJob.status !== 'open' && <div className="w-full py-3 bg-gray-800 text-center text-gray-400 rounded-lg">
                  Job is in progress
                </div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">About the Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                  {currentJob.createdByName?.charAt(0) || 'C'}
                </div>
                <div>
                  <div className="font-medium text-white">
                    {currentJob.createdByName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Member since {new Date().getFullYear()}
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> Sri Lanka
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" /> Payment Verified
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isFreelancer && <ProposalModal isOpen={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)} jobId={currentJob.id} jobTitle={currentJob.title} />}
    </Layout>;
}
function MapPinIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>;
}
function CheckCircleIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>;
}