import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { SafeUser } from '../../types';
import { proposalsService } from '../../services/proposals.service';
import { contractsService } from '../../services/contracts.service';
interface PerformanceOverviewProps {
  user: SafeUser;
}
export function PerformanceOverview({ user }: PerformanceOverviewProps) {
  const [totalProposals, setTotalProposals] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [activeContracts, setActiveContracts] = useState(0);
  useEffect(() => {
    const loadStats = async () => {
      const proposals = await proposalsService.listByFreelancer(user.id);
      setTotalProposals(proposals.length);
      const allContracts = await contractsService.listContracts();
      const userContracts = allContracts.filter(
        (c) => c.freelancerId === user.id
      );
      setCompletedProjects(
        userContracts.filter((c) => c.status === 'completed').length
      );
      setActiveContracts(
        userContracts.filter((c) => c.status === 'active').length
      );
    };
    loadStats();
  }, [user.id]);
  const stats = [
  {
    label: 'Total Proposals',
    value: totalProposals,
    subtext: 'Submitted job applications'
  },
  {
    label: 'Completed Projects',
    value: completedProjects,
    subtext: 'Successfully delivered'
  },
  {
    label: 'Active Contracts',
    value: activeContracts,
    subtext: 'Currently ongoing work'
  }];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) =>
          <div
            key={index}
            className="bg-[#111827]/50 rounded-lg border border-gray-800 p-5 flex flex-col items-center text-center hover:border-gray-700 transition-colors">

              <span className="text-3xl font-bold text-[#f97316] mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#666666]">{stat.subtext}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

}