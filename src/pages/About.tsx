import React from 'react';
import { Layout } from '../components/ui/Layout';
import { GraduationCap, Briefcase, Smile, Globe } from 'lucide-react';
export function About() {
  return <Layout>
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Hero */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Empowering University Talent
          </h1>
          <p className="text-xl text-[#888888] max-w-2xl mx-auto leading-relaxed">
            UniFreelancer is Sri Lanka's first dedicated marketplace connecting
            university students with real-world opportunities.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-[#888888] leading-relaxed">
              To provide a secure, transparent, and accessible platform for
              students to monetize their skills, gain practical experience, and
              achieve financial independence while studying.
            </p>
          </div>
          <div className="bg-[#111111] border border-[#222222] p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-[#888888] leading-relaxed">
              To build the largest ecosystem of student professionals, bridging
              the gap between academic learning and industry demands across the
              nation.
            </p>
          </div>
        </div>

        {/* Why UniFreelancer */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Why UniFreelancer?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-[#222222] p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Built for Students
              </h3>
              <p className="text-[#888888] text-sm">
                Tailored to academic schedules and needs. We understand the
                unique challenges of balancing study and work.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#222222] p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Secure & Structured
              </h3>
              <p className="text-[#888888] text-sm">
                Escrow-style payments and verified profiles ensure safety for
                both clients and freelancers.
              </p>
            </div>
            <div className="bg-[#0a0a0a] border border-[#222222] p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Transparent Ratings
              </h3>
              <p className="text-[#888888] text-sm">
                Merit-based system where reputation is built on quality work,
                not just years of experience.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Stats (Reused style) */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] text-center">
              <GraduationCap className="w-8 h-8 text-[#f97316] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">100k+</div>
              <div className="text-xs text-[#666666]">Students</div>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] text-center">
              <Briefcase className="w-8 h-8 text-[#f97316] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">25k+</div>
              <div className="text-xs text-[#666666]">Jobs Posted</div>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] text-center">
              <Smile className="w-8 h-8 text-[#f97316] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">92%</div>
              <div className="text-xs text-[#666666]">Satisfaction</div>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl border border-[#222222] text-center">
              <Globe className="w-8 h-8 text-[#f97316] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">120+</div>
              <div className="text-xs text-[#666666]">Campuses</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>;
}