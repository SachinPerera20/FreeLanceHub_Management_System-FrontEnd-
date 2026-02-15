import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function navItemClass({ isActive }: { isActive: boolean }) {
  const base =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold " +
    "transition-all duration-200 ease-out transform-gpu will-change-transform select-none";

  // Hover: pop + white bg + black text
  const hover =
    "hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/25";

  // Default (not active): white text
  const idle = "text-white bg-transparent";

  // Active: black bg + light blue text (stays black even on hover)
  const active = isActive
    ? "bg-black text-sky-300 shadow-lg shadow-black/30"
    : "";

  return `${base} ${isActive ? active : idle} ${hover}`;
}

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            <span className="text-sm font-extrabold text-white">FH</span>
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            FreelanceHub
          </span>
        </NavLink>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navItemClass} end>
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navItemClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navItemClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/jobs" className={navItemClass} end>
                Jobs
              </NavLink>

              {user.role === "client" && (
                <NavLink to="/jobs/create" className={navItemClass}>
                  Create Job
                </NavLink>
              )}

              <NavLink to="/contracts" className={navItemClass}>
                Contracts
              </NavLink>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Admin
                </Link>
              )}

              <NavLink to="/profile" className={navItemClass}>
                Profile
              </NavLink>

              {/* user chip */}
              <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
                <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
                  <span className="text-xs font-bold text-white">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-white/60">{user.role}</p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold
                    bg-white/10 border border-white/10 text-white
                    transition-all duration-200 ease-out transform-gpu
                    hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/25"
                >
                  Logout
                </button>
              </div>

              {/* mobile logout */}
              <button
                type="button"
                onClick={logout}
                className="sm:hidden inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold
                  bg-white/10 border border-white/10 text-white
                  transition-all duration-200 ease-out transform-gpu
                  hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/25"
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
