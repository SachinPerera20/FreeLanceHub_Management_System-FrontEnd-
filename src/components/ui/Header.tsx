import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Apple-ish nav:
 * - at top: plain black text
 * - as you scroll: frosted white bar + pills
 */
function navItemClass(isActive: boolean, t: number) {
  const base =
    "inline-flex items-center rounded-full px-3 py-2 text-sm font-medium select-none " +
    "transition-all duration-200 ease-out";

  // top: text-only
  if (t < 0.18) {
    return cx(
      base,
      "text-black/80 hover:text-black hover:bg-black/5",
      isActive && "text-black bg-black/10",
    );
  }

  // scrolled: pill active
  return cx(
    base,
    "text-black/80 hover:text-black hover:bg-black/5",
    isActive && "bg-black text-white shadow-sm",
  );
}

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Smooth morph progress: 0..1 within first 120px
  const tRaw = useScrollProgress(120);
  const t = Math.min(1, Math.max(0, tRaw));

  // Spread ON SCROLL (tight -> wide)
  const innerStyle = useMemo(() => {
    // spreads out as you scroll
    const maxW = isHome ? lerp(980, 1600, t) : 1200;
    const px = isHome ? lerp(16, 40, t) : 24;

    return {
      maxWidth: `${maxW}px`,
      paddingLeft: `${px}px`,
      paddingRight: `${px}px`,
      transition: "max-width 240ms ease, padding 240ms ease",
    } as React.CSSProperties;
  }, [isHome, t]);

  // Frosted header background ramps up
  const headerStyle = useMemo(() => {
    const bgAlpha = lerp(0.0, 0.82, t);
    const borderAlpha = lerp(0.0, 0.12, t);
    const shadowAlpha = lerp(0.0, 0.16, t);

    return {
      backgroundColor: `rgba(255,255,255,${bgAlpha})`,
      borderColor: `rgba(0,0,0,${borderAlpha})`,
      boxShadow: `0 10px 30px rgba(0,0,0,${shadowAlpha})`,
      backdropFilter: t > 0.02 ? "blur(16px)" : "none",
      WebkitBackdropFilter: t > 0.02 ? "blur(16px)" : "none",
      transition:
        "background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
    } as React.CSSProperties;
  }, [t]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={headerStyle}
      >
        <div
          className="h-16 mx-auto flex items-center justify-between"
          style={innerStyle}
        >
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl grid place-items-center border bg-black/5 border-black/10">
              <span className="text-sm font-extrabold text-black">FH</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-black">
              FreelanceHub
            </span>
          </NavLink>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) => navItemClass(isActive, t)}
            >
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) => navItemClass(isActive, t)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) => navItemClass(isActive, t)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  end
                  className={({ isActive }) => navItemClass(isActive, t)}
                >
                  Jobs
                </NavLink>

                {user.role === "client" && (
                  <NavLink
                    to="/jobs/create"
                    className={({ isActive }) => navItemClass(isActive, t)}
                  >
                    Create Job
                  </NavLink>
                )}

                <NavLink
                  to="/contracts"
                  className={({ isActive }) => navItemClass(isActive, t)}
                >
                  Contracts
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) => navItemClass(isActive, t)}
                >
                  Profile
                </NavLink>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={cx(
                      "ml-1 rounded-full px-3 py-2 text-sm font-medium",
                      "text-black/80 hover:text-black hover:bg-black/5 transition",
                    )}
                  >
                    Admin
                  </Link>
                )}

                {/* User chip */}
                <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-black/10">
                  <div className="h-9 w-9 rounded-xl bg-black/5 border border-black/10 grid place-items-center">
                    <span className="text-xs font-bold text-black">
                      {user.name?.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-black">
                      {user.name}
                    </p>
                    <p className="text-xs text-black/60">{user.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={logout}
                    className="ml-2 rounded-full px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90 transition"
                  >
                    Logout
                  </button>
                </div>

                {/* Mobile logout */}
                <button
                  type="button"
                  onClick={logout}
                  className="sm:hidden rounded-full px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Spacer so page content starts below fixed header */}
      <div className="h-16" />
    </>
  );
}
