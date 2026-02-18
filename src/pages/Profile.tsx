import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../state/auth';
import { Layout } from '../components/ui/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../components/ui/Cards';
import { RoleBadge } from '../components/ui/Badges';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { PerformanceOverview } from '../components/profile/PerformanceOverview';
import { ClientReviews } from '../components/profile/ClientReviews';
import { FreelancerRating } from '../components/profile/FreelancerRating';
import { usersService } from '../services/users.service';
import { proposalsService } from '../services/proposals.service';
import { ProposalList } from '../components/jobs/ProposalList';
import { SafeUser, Proposal } from '../types';
export function Profile() {
  const { userId } = useParams<{
    userId?: string;
  }>();
  const { user: loggedInUser } = useAuth();
  const [profileUser, setProfileUser] = useState<SafeUser | null>(null);
  const [freelancerProposals, setFreelancerProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const isOwnProfile = !userId || userId === loggedInUser?.id;
  useEffect(() => {
    const loadProfile = async () => {
      if (isOwnProfile) {
        setProfileUser(loggedInUser as SafeUser | null);
      } else if (userId) {
        setLoading(true);
        const fetched = await usersService.getUserById(userId);
        setProfileUser(fetched);
        setLoading(false);
      }
    };
    loadProfile();
  }, [userId, loggedInUser, isOwnProfile]);
  useEffect(() => {
    const loadProposals = async () => {
      if (profileUser && profileUser.role === 'freelancer') {
        const proposals = await proposalsService.listByFreelancer(
          profileUser.id
        );
        setFreelancerProposals(proposals);
      }
    };
    loadProposals();
  }, [profileUser]);
  if (!loggedInUser) return null;
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>);

  }
  if (!profileUser) return null;
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          {isOwnProfile ? 'My Profile' : `${profileUser.name}'s Profile`}
        </h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-teal-900/30 rounded-full flex items-center justify-center text-teal-400 border-2 border-teal-500/30 shadow-lg shadow-teal-500/10">
                <User className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      {profileUser.name}
                    </h2>
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                      <RoleBadge role={profileUser.role} />
                      {profileUser.role === 'freelancer' &&
                      <FreelancerRating user={profileUser} />
                      }
                    </div>
                  </div>

                  {profileUser.role === 'freelancer' &&
                  <div className="hidden md:block text-right"></div>
                  }
                </div>

                {profileUser.bio &&
                <p className="mt-4 text-gray-300 max-w-2xl leading-relaxed">
                    {profileUser.bio}
                  </p>
                }
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 mt-6 border-t border-[#222222] pt-6">
            <div
              className={`grid grid-cols-1 ${isOwnProfile ? 'md:grid-cols-2' : ''} gap-6`}>

              {isOwnProfile &&
              <div className="flex items-center p-4 bg-[#111827]/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="w-10 h-10 bg-[#1f2937] rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Email Address
                    </p>
                    <p className="text-white font-medium">
                      {profileUser.email}
                    </p>
                  </div>
                </div>
              }

              <div className="flex items-center p-4 bg-[#111827]/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-10 h-10 bg-[#1f2937] rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Member Since
                  </p>
                  <p className="text-white font-medium">
                    {format(new Date(profileUser.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {profileUser.role === 'freelancer' &&
        <>
            <PerformanceOverview user={profileUser} />

            {/* Proposals Section */}
            {freelancerProposals.length > 0 &&
          <Card>
                <CardHeader>
                  <CardTitle>
                    Proposals ({freelancerProposals.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProposalList
                proposals={freelancerProposals}
                isOwner={false} />

                </CardContent>
              </Card>
          }

            <ClientReviews freelancerId={profileUser.id} />
          </>
        }
      </div>
    </Layout>);

}