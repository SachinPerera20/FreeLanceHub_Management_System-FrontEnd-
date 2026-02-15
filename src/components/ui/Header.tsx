import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  // Home-only: track whether hero is visible
  const [heroVisibleState, setHeroVisibleState] = useState(true);

  // ✅ Derived value: on non-home pages, hero is always treated as NOT visible
  const heroVisible = isHome ? heroVisibleState : false;

  const rafRef = useRef<number | null>(null);

  // Scroll shadow (all pages)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Home hero visibility (ONLY when isHome)
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      // Throttle using rAF
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const hero = document.getElementById("home-hero");
        if (!hero) {
          setHeroVisibleState(true);
          return;
        }

        const rect = hero.getBoundingClientRect();
        const viewportH = window.innerHeight || 0;

        // Visible if at least part of hero is in viewport
        const isVisible = rect.bottom > 80 && rect.top < viewportH * 0.6;
        setHeroVisibleState(isVisible);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isHome]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cx(
      "px-3 py-2 rounded-lg text-sm font-medium transition",
      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
    );

  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full",
        "border-b border-white/10",
        "backdrop-blur-xl",
        scrolled ? "bg-zinc-950/70" : "bg-zinc-950/40"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Link to="/" className="font-extrabold text-white tracking-tight">
              FreelanceHub
            </Link>

            {/* Optional: subtle indicator that hero is visible on Home */}
            {isHome ? (
              <span
                className={cx(
                  "hidden sm:inline-flex text-xs px-2 py-1 rounded-full border",
                  heroVisible
                    ? "border-emerald-400/30 text-emerald-200 bg-emerald-400/10"
                    : "border-white/10 text-white/50 bg-white/5"
                )}
              >
                {heroVisible ? "Hero in view" : "Scrolling"}
              </span>
            ) : null}
          </div>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navClass} end>
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink to="/jobs" className={navClass}>
                  Jobs
                </NavLink>

                <NavLink to="/contracts" className={navClass}>
                  Contracts
                </NavLink>

                <NavLink to="/profile" className={navClass}>
                  Profile
                </NavLink>

                {user.role === "admin" ? (
                  <NavLink to="/admin" className={navClass}>
                    Admin
                  </NavLink>
                ) : null}
              </>
            ) : null}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-zinc-950 hover:opacity-90 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="hidden sm:inline text-sm text-white/70">
                  {user.name} • <span className="text-white/50">{user.role}</span>
                </span>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
