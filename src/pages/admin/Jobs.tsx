import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { StatusBadge, CategoryBadge } from '../../components/ui/Badges';
import { useJobs } from '../../state/jobs';
import { Search, Flag, FlagOff, ExternalLink } from 'lucide-react';
export function AdminJobs() {
  const {
    jobs,
    fetchJobs,
    toggleFlag,
    isLoading
  } = useJobs();
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()) || (j.createdByName || '').toLowerCase().includes(search.toLowerCase()));
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Job Management</h1>

      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input placeholder="Search jobs by title or creator..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                    Title
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Created By
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Budget
                  </th>
                  <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job) => <tr key={job.id} className={`border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors ${job.flagged ? 'bg-red-900/10' : ''}`}>
                    <td className="p-4">
                      <Link to={`/jobs/${job.id}`} className="text-white font-medium hover:text-teal-400 transition-colors">
                        {job.title}
                      </Link>
                    </td>
                    <td className="p-4">
                      <CategoryBadge category={job.category} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {job.createdByName || 'Unknown'}
                    </td>
                    <td className="p-4 text-teal-400 font-medium">
                      LKR {job.budget.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant={job.flagged ? 'danger' : 'ghost'} size="sm" onClick={() => toggleFlag(job.id)} title={job.flagged ? 'Unflag' : 'Flag'}>
                          {job.flagged ? <FlagOff className="w-3 h-3" /> : <Flag className="w-3 h-3" />}
                        </Button>
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-500">No jobs found.</div>}
        </Card>}
    </Layout>;
}