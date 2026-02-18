import React from 'react';
import { Layout } from '../components/ui/Layout';
import { Button } from '../components/ui/FormControls';
import { Calendar } from 'lucide-react';
export function Blog() {
  const posts = [{
    title: 'How Students Can Start Freelancing',
    excerpt: 'A complete guide to identifying your skills and landing your first gig while still in university.',
    date: 'Oct 12, 2023',
    readTime: '5 min read'
  }, {
    title: 'Building a Strong Freelancer Profile',
    excerpt: 'Tips and tricks to make your profile stand out to clients. Why a good bio and portfolio matter.',
    date: 'Oct 08, 2023',
    readTime: '4 min read'
  }, {
    title: 'How to Win More Proposals',
    excerpt: 'Writing cover letters that convert. Learn the psychology behind a winning bid.',
    date: 'Sep 25, 2023',
    readTime: '6 min read'
  }, {
    title: 'Managing Academic Work & Freelance Projects',
    excerpt: 'Balancing deadlines is tough. Here are strategies to manage your time effectively.',
    date: 'Sep 15, 2023',
    readTime: '7 min read'
  }, {
    title: 'Top 5 Skills in Demand for 2024',
    excerpt: 'What clients are looking for right now. From React development to academic writing.',
    date: 'Sep 01, 2023',
    readTime: '3 min read'
  }, {
    title: 'Understanding Client Expectations',
    excerpt: 'How to communicate effectively and deliver work that gets you 5-star ratings.',
    date: 'Aug 20, 2023',
    readTime: '5 min read'
  }];
  return <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Blog & Resources
          </h1>
          <p className="text-xl text-[#888888] max-w-2xl mx-auto">
            Insights, tips, and guides for the UniFreelancer community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => <div key={i} className="bg-[#0a0a0a] border border-[#222222] rounded-xl overflow-hidden hover:border-[#333333] transition-all group flex flex-col">
              <div className="h-48 bg-[#111111] w-full flex items-center justify-center text-[#333333]">
                {/* Placeholder for blog image */}
                <div className="w-16 h-16 rounded-full bg-[#222222]"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-[#666666] mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f97316] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Read Article
                </Button>
              </div>
            </div>)}
        </div>
      </div>
    </Layout>;
}