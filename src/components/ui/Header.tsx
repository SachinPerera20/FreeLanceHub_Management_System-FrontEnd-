import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import { useNotifications } from '../../state/notifications';
import { useChat } from '../../state/chat';
import { Bell, MessageSquare, Menu, X, LogOut, User, Briefcase, FileText, LayoutDashboard, Search } from 'lucide-react';
import { Button } from './FormControls';
export function Header() {
  const {
    user,
    logout
  } = useAuth();
  const {
    unreadCount: notifCount
  } = useNotifications();
  const {
    totalUnreadCount: chatCount
  } = useChat();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const isActive = (path: string) => location.pathname === path;
  const NavLink = ({
    to,
    children,
    icon: Icon




  }: {to: string;children: React.ReactNode;icon?: any;}) => <Link to={to} className={`
        flex items-center space-x-2 text-sm font-medium transition-all duration-200
        ${isActive(to) ? 'text-[#f97316]' : 'text-[#888888] hover:text-white'}
      `} onClick={() => setIsMobileMenuOpen(false)}>
      {Icon && <Icon className={`w-4 h-4 ${isActive(to) ? 'text-[#f97316]' : 'text-[#666666] group-hover:text-white'}`} />}
      <span>{children}</span>
    </Link>;
  return <header className="sticky top-0 z-40 w-full border-b border-[#222222] bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img src="/Untitled_design_(1).png" alt="UniFreelancer" className="h-8 w-auto group-hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" icon={LayoutDashboard}>
            Home
          </NavLink>

          {user ? <>
              {user.role === 'CLIENT' && <>
                  <NavLink to="/jobs" icon={Search}>
                    Find Talent
                  </NavLink>
                  <NavLink to="/jobs/my" icon={Briefcase}>
                    My Requests
                  </NavLink>
                  <NavLink to="/contracts" icon={FileText}>
                    Contracts
                  </NavLink>
                </>}

              {user.role === 'FREELANCER' && <>
                  <NavLink to="/jobs" icon={Search}>
                    Find Work
                  </NavLink>
                  <NavLink to="/jobs/applied" icon={Briefcase}>
                    Applied
                  </NavLink>
                  <NavLink to="/contracts" icon={FileText}>
                    Contracts
                  </NavLink>
                </>}

              {user.role === 'admin' && <>
                  <NavLink to="/admin" icon={LayoutDashboard}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/admin/users" icon={User}>
                    Users
                  </NavLink>
                  <NavLink to="/admin/jobs" icon={Briefcase}>
                    Jobs
                  </NavLink>
                </>}
            </> : <NavLink to="/jobs" icon={Search}>
              Browse Requests
            </NavLink>}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {user ? <>
              <Link to="/chat" className="relative text-[#888888] hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
                {chatCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                    {chatCount}
                  </span>}
              </Link>

              <Link to="/notifications" className="relative text-[#888888] hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                {notifCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                    {notifCount}
                  </span>}
              </Link>

              <div className="hidden md:flex items-center space-x-4 ml-4 border-l border-[#222222] pl-4">
                <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium text-[#888888] hover:text-white transition-colors">
                  <div className="w-8 h-8 bg-[#111111] rounded-full flex items-center justify-center border border-[#333333]">
                    <User className="w-4 h-4 text-[#888888]" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-[#888888] hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </> : <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-[#888888] hover:text-white transition-colors">
                Login
              </Link>
              <Link to="/register">
                <Button size="sm" variant="primary">
                  Get Started
                </Button>
              </Link>
            </div>}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#888888] hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden border-t border-[#222222] bg-black">
          <div className="px-4 py-6 space-y-4">
            <NavLink to="/">Home</NavLink>
            {user ? <>
                {user.role === 'CLIENT' && <>
                    <NavLink to="/jobs">Find Talent</NavLink>
                    <NavLink to="/jobs/create">Create Request</NavLink>
                    <NavLink to="/jobs/my">My Requests</NavLink>
                    <NavLink to="/contracts">Contracts</NavLink>
                  </>}
                {user.role === 'FREELANCER' && <>
                    <NavLink to="/jobs">Find Work</NavLink>
                    <NavLink to="/jobs/applied">Applied Jobs</NavLink>
                    <NavLink to="/jobs/saved">Saved Jobs</NavLink>
                    <NavLink to="/contracts">Contracts</NavLink>
                  </>}
                {user.role === 'admin' && <>
                    <NavLink to="/admin">Dashboard</NavLink>
                    <NavLink to="/admin/users">Users</NavLink>
                    <NavLink to="/admin/jobs">Jobs</NavLink>
                  </>}
                <div className="pt-4 border-t border-[#222222]">
                  <NavLink to="/profile">Profile</NavLink>
                  <button onClick={handleLogout} className="flex items-center space-x-2 text-sm font-medium text-red-400 mt-4 w-full">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </> : <div className="pt-4 border-t border-[#222222] space-y-4">
                <Link to="/login" className="block text-sm font-medium text-[#888888]">
                  Login
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>}
          </div>
        </div>}
    </header>;
}