import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { StatusBadge } from '../../components/ui/Badges';
import { useProposals } from '../../state/proposals';
import { Search, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export function AdminProposals() {
  const {
    proposals,
    fetchAll,
    deleteProposal,
    isLoading
  } = useProposals();
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);
  const filtered = proposals.filter((p) => p.freelancerName.toLowerCase().includes(search.toLowerCase()) || p.coverLetter.toLowerCase().includes(search.toLowerCase()));
  const handleDelete = async (proposalId: string) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      await deleteProposal(proposalId);
    }
  };
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">
        Proposal Management
      </h1>

      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input placeholder="Search proposals by freelancer or content..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {isLoading ? <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div> : <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Freelancer
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Bid
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Days
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Submitted
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => <tr key={p.id} className="border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors">
                    <td className="p-4 text-white font-medium">
                      {p.freelancerName}
                    </td>
                    <td className="p-4 text-teal-400 font-medium">
                      LKR {p.bidAmount.toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-400">{p.estimatedDays}d</td>
                    <td className="p-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {formatDistanceToNow(new Date(p.submittedAt), {
                  addSuffix: true
                })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/jobs/${p.jobId}`}>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-500">
              No proposals found.
            </div>}
        </Card>}
    </Layout>;
}