import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/ui/Layout';
import { Button } from '../components/ui/FormControls';
import { UserPlus, Search, FileText, CheckCircle, Star, Briefcase, MessageSquare, DollarSign, ArrowRight } from 'lucide-react';
export function HowItWorks() {
  return <Layout>
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            How UniFreelancer Works
          </h1>
          <p className="text-xl text-[#888888] max-w-2xl mx-auto">
            A simple, secure marketplace connecting university talent with
            real-world needs.
          </p>
        </div>

        {/* For Clients */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#222222]"></div>
            <h2 className="text-2xl font-bold text-white">For Clients</h2>
            <div className="h-px flex-1 bg-[#222222]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[{
            icon: FileText,
            title: '1. Post a Job',
            desc: 'Describe your project, budget, and timeline. It’s free to post and takes minutes.'
          }, {
            icon: Search,
            title: '2. Review Proposals',
            desc: 'Get proposals from talented students. Check their profiles, ratings, and portfolios.'
          }, {
            icon: MessageSquare,
            title: '3. Hire & Chat',
            desc: 'Select the best fit. Chat directly to discuss details and set milestones.'
          }, {
            icon: Briefcase,
            title: '4. Track Progress',
            desc: 'Monitor work in real-time. Approve deliverables as they are completed.'
          }, {
            icon: CheckCircle,
            title: '5. Approve & Pay',
            desc: 'Release payment only when you’re 100% satisfied with the work.'
          }, {
            icon: Star,
            title: '6. Leave a Review',
            desc: 'Rate your freelancer to help build trust in the community.'
          }].map((step, i) => <div key={i} className="bg-[#111111] border border-[#222222] p-6 rounded-xl hover:border-[#333333] transition-colors">
                <div className="w-10 h-10 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>)}
          </div>
        </div>

        {/* For Freelancers */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#222222]"></div>
            <h2 className="text-2xl font-bold text-white">For Freelancers</h2>
            <div className="h-px flex-1 bg-[#222222]"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[{
            icon: UserPlus,
            title: '1. Create Profile',
            desc: 'Sign up with your university email. Showcase your skills, bio, and portfolio.'
          }, {
            icon: Search,
            title: '2. Browse Jobs',
            desc: 'Find projects that match your skills. Filter by category, budget, and more.'
          }, {
            icon: FileText,
            title: '3. Submit Proposals',
            desc: 'Write a compelling cover letter and set your bid. Stand out from the crowd.'
          }, {
            icon: Briefcase,
            title: '4. Complete Work',
            desc: 'Deliver high-quality work on time. Communicate clearly with your client.'
          }, {
            icon: DollarSign,
            title: '5. Get Paid',
            desc: 'Receive secure payments directly to your account upon completion.'
          }, {
            icon: Star,
            title: '6. Build Reputation',
            desc: 'Earn 5-star ratings to rank higher and win more jobs.'
          }].map((step, i) => <div key={i} className="bg-[#111111] border border-[#222222] p-6 rounded-xl hover:border-[#333333] transition-colors">
                <div className="w-10 h-10 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>)}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="text-[#888888] max-w-lg mx-auto">
            Join thousands of students and clients building the future of work.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="shadow-lg shadow-orange-500/20">
                Join Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>;
}