import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../state/auth";
import { Button } from "../components/ui/FormControls";
import { Header } from "../components/ui/Header";
import {
  ArrowRight,
  BookOpen,
  Code,
  PenTool,
  Users,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  Smile,
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  CheckCircle2,
  Lock,
  Star,
  Award,
} from "lucide-react";
export function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-black flex flex-col text-white selection:bg-[#f97316] selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center relative overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        >
          <source src="public\herobgvid.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>

        {/* Subtle gradient glow - orange/warm tone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/[0.04] rounded-full blur-[120px] z-10 pointer-events-none"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
            Connect. Create.
            <br />
            <span className="text-[#555555]">Collaborate.</span>
          </h1>

          <p className="text-xl text-[#888888] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            UniFreelancer connects Sri Lankan university talent with real-world
            academic support and services. Find help or offer your skills today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {user ? (
              <Link to="/jobs">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[160px] shadow-lg shadow-orange-500/20"
                >
                  Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-w-[160px] shadow-lg shadow-orange-500/20"
                  >
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto min-w-[160px]"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Analytics / Platform Impact Section */}
      <section className="py-20 bg-[#0a0a0a] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
              Platform Impact
            </h2>
            <p className="text-[#888888] max-w-2xl mx-auto">
              Empowering the next generation of professionals through
              collaboration and opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Stat 1 */}
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#222222] hover:border-[#333333] transition-all text-center group">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#f97316]" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">100k+</h3>
              <p className="font-semibold text-[#cccccc] mb-1">
                Registered Students
              </p>
              <p className="text-sm text-[#666666]">
                Growing university talent network
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#222222] hover:border-[#333333] transition-all text-center group">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6 text-[#f97316]" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">25k+</h3>
              <p className="font-semibold text-[#cccccc] mb-1">Jobs Posted</p>
              <p className="text-sm text-[#666666]">
                Assignments, projects, tutoring & more
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#222222] hover:border-[#333333] transition-all text-center group">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Smile className="w-6 h-6 text-[#f97316]" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">92%</h3>
              <p className="font-semibold text-[#cccccc] mb-1">
                Client Satisfaction
              </p>
              <p className="text-sm text-[#666666]">
                Fast delivery and quality outcomes
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#222222] hover:border-[#333333] transition-all text-center group">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-[#f97316]" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">120+</h3>
              <p className="font-semibold text-[#cccccc] mb-1">
                Active Campuses
              </p>
              <p className="text-sm text-[#666666]">
                Students collaborating across universities
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-full border border-[#222222] text-sm font-medium text-[#888888]">
              <CheckCircle2 className="w-4 h-4 text-[#f97316]" /> Verified
              Profiles
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-full border border-[#222222] text-sm font-medium text-[#888888]">
              <Lock className="w-4 h-4 text-[#f97316]" /> Secure Messaging
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-full border border-[#222222] text-sm font-medium text-[#888888]">
              <Award className="w-4 h-4 text-[#f97316]" /> Milestone Tracking
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-full border border-[#222222] text-sm font-medium text-[#888888]">
              <Star className="w-4 h-4 text-[#f97316]" /> Ratings & Reviews
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 bg-black border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">
                Ready to find talent or start earning?
              </h3>
              <p className="text-[#888888] mt-1">
                Join thousands of students and clients today.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/register">
                <Button size="lg" className="shadow-lg shadow-orange-500/20">
                  Get Started
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="outline" size="lg">
                  Browse Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-[#111111] border border-[#222222] p-8 rounded-xl hover:border-[#444444] transition-all duration-300">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                For Students & Clients
              </h3>
              <p className="text-[#888888] leading-relaxed">
                Post requests for assignments, projects, or tutoring. Connect
                with talented peers who can help you succeed.
              </p>
            </div>

            <div className="group bg-[#111111] border border-[#222222] p-8 rounded-xl hover:border-[#444444] transition-all duration-300">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                For Freelancers
              </h3>
              <p className="text-[#888888] leading-relaxed">
                Monetize your skills. Offer coding help, design services, or
                tutoring to other students and earn extra income.
              </p>
            </div>

            <div className="group bg-[#111111] border border-[#222222] p-8 rounded-xl hover:border-[#444444] transition-all duration-300">
              <div className="w-12 h-12 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                Secure Platform
              </h3>
              <p className="text-[#888888] leading-relaxed">
                Verified university profiles, secure payments (coming soon), and
                a trusted community environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-black border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-16 tracking-tight">
            Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Assignment Help",
                icon: BookOpen,
              },
              {
                name: "Project Support",
                icon: Code,
              },
              {
                name: "Design & Slides",
                icon: PenTool,
              },
              {
                name: "Tutoring",
                icon: Users,
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/jobs?category=${cat.name}`}
                className="flex flex-col items-center justify-center p-8 bg-[#0a0a0a] border border-[#222222] rounded-xl hover:bg-[#111111] hover:border-[#444444] transition-all duration-300 group"
              >
                <cat.icon className="w-8 h-8 text-[#666666] group-hover:text-[#f97316] mb-4 transition-colors" />
                <span className="text-[#888888] font-medium group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Commercial Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#222222] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <img
                  src="/Untitled_design_(1).png"
                  alt="UniFreelancer"
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-[#888888] text-sm leading-relaxed">
                The premier marketplace for university talent. Connect,
                collaborate, and succeed together.
              </p>
            </div>

            {/* Column 2: Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-[#888888]">
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Find Talent
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs/create"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contracts"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Contracts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-[#888888]">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-[#888888]">
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="hover:text-[#f97316] transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#222222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#555555]">
              &copy; {new Date().getFullYear()} UniFreelancer. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-[#555555] hover:text-[#f97316] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#555555] hover:text-[#f97316] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#555555] hover:text-[#f97316] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
