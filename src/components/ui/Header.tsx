import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function linkClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium transition ${
    isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
  }`;
}

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="text-lg font-bold text-gray-900">
          FreelanceHub
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
  <NavLink to="/jobs" end className={linkClass}>
    Jobs
  </NavLink>

  {user.role === 'client' && (
    <NavLink to="/jobs/create" className={linkClass}>
      Create Job
    </NavLink>
  )}

  <NavLink to="/contracts" className={linkClass}>
    Contracts
  </NavLink>

  <NavLink to="/profile" className={linkClass}>
    Profile
  </NavLink>

  <button
    onClick={logout}
    className="rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
  >
    Logout
  </button>
</>

          )}
        </nav>
      </div>
    </header>
  );

}