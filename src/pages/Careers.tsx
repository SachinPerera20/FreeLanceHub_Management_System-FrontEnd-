import React from 'react';
import { Layout } from '../components/ui/Layout';
import { Button } from '../components/ui/FormControls';
import { ArrowRight } from 'lucide-react';
export function Careers() {
  const positions = [{
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    desc: 'Build the future of our platform using React, TypeScript, and Tailwind CSS.'
  }, {
    title: 'Backend Developer',
    type: 'Full-time',
    location: 'Colombo / Remote',
    desc: 'Scale our Node.js infrastructure to handle thousands of concurrent users.'
  }, {
    title: 'Campus Ambassador',
    type: 'Part-time',
    location: 'Various Universities',
    desc: 'Represent UniFreelancer at your campus and build the local community.'
  }, {
    title: 'Marketing Intern',
    type: 'Internship',
    location: 'Remote',
    desc: 'Help us tell our story and reach more students across the island.'
  }];
  return <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Join Our Team
          </h1>
          <p className="text-xl text-[#888888] max-w-2xl mx-auto">
            We're on a mission to revolutionize student employment. Come build
            with us.
          </p>
        </div>

        <div className="grid gap-6">
          {positions.map((job, i) => <div key={i} className="bg-[#111111] border border-[#222222] p-6 rounded-xl hover:border-[#333333] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <div className="flex gap-3 mt-2 text-sm text-[#666666]">
                  <span className="bg-[#222222] px-2 py-0.5 rounded text-[#888888]">
                    {job.type}
                  </span>
                  <span className="bg-[#222222] px-2 py-0.5 rounded text-[#888888]">
                    {job.location}
                  </span>
                </div>
                <p className="text-[#888888] mt-3 max-w-xl">{job.desc}</p>
              </div>
              <Button variant="outline" className="shrink-0">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>)}
        </div>

        <div className="bg-[#0a0a0a] border border-[#222222] p-8 rounded-xl text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Don't see a fit?
          </h3>
          <p className="text-[#888888] mb-4">
            We are always looking for talented contributors. Send your CV to
            careers@unifreelancer.com
          </p>
        </div>
      </div>
    </Layout>;
}