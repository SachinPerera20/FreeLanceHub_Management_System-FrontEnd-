import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { Users, Briefcase, FileText, DollarSign, Bell, ArrowRight } from 'lucide-react';
import { useAuth } from '../../state/auth';
import { useJobs } from '../../state/jobs';
import { useNotifications } from '../../state/notifications';
import { STORAGE_KEYS, readStore } from '../../lib/storage';
import type { Proposal, Contract } from '../../types';
export function Dashboard() {
  const {
    getAllUsers
  } = useAuth();
  const {
    jobs,
    fetchJobs
  } = useJobs();
  const {
    unreadCount
  } = useNotifications();
  const [userCount, setUserCount] = useState(0);
  const [proposalCount, setProposalCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  useEffect(() => {
    fetchJobs();
    getAllUsers().then((users) => setUserCount(users.length));
    const proposals = readStore<Proposal[]>(STORAGE_KEYS.PROPOSALS, []);
    setProposalCount(proposals.length);
    const contracts = readStore<Contract[]>(STORAGE_KEYS.CONTRACTS, []);
    setContractCount(contracts.length);
  }, [fetchJobs, getAllUsers]);
  const stats = [{
    label: 'Total Users',
    value: String(userCount),
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-900/20',
    link: '/admin/users'
  }, {
    label: 'Active Jobs',
    value: String(jobs.length),
    icon: Briefcase,
    color: 'text-teal-400',
    bg: 'bg-teal-900/20',
    link: '/admin/jobs'
  }, {
    label: 'Proposals',
    value: String(proposalCount),
    icon: FileText,
    color: 'text-purple-400',
    bg: 'bg-purple-900/20',
    link: '/admin/proposals'
  }, {
    label: 'Contracts',
    value: String(contractCount),
    icon: DollarSign,
    color: 'text-green-400',
    bg: 'bg-green-900/20',
    link: '/admin'
  }];
  return <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => <Link key={stat.label} to={stat.link}>
            <Card className="hover:border-teal-500/30 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </Link>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/users" className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors">
              <span className="text-gray-300">Manage Users</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
            <Link to="/admin/jobs" className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors">
              <span className="text-gray-300">Moderate Jobs</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
            <Link to="/admin/proposals" className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors">
              <span className="text-gray-300">Review Proposals</span>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">All systems operational</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">
                {unreadCount} unread notifications
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              Mock mode active — localStorage backend
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>;
}