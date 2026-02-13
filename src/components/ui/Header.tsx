import { Link, NavLink } from 'react-router-dom';

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'text-sm font-medium transition',
          isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-gray-900">
          FreelanceHub
        </Link>

        <nav className="flex items-center gap-6">
          <NavItem to="/" label="Home" />
          <NavItem to="/login" label="Login" />
          <NavItem to="/register" label="Register" />
        </nav>
      </div>
    </header>
  );
}
