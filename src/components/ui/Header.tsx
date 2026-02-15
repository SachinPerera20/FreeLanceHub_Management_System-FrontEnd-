import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useMemo, useState } from "react";

function navItemClass(isActive: boolean, textColor: string) {
  const base =
    "inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold " +
    "transition-all duration-200 ease-out transform-gpu will-change-transform select-none";

  const hover =
    "hover:-translate-y-0.5 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/25";

  const idle = `${textColor} bg-transparent`;

  const active = isActive
    ? "bg-black text-sky-300 shadow-lg shadow-black/30"
    : "";

  return `${base} ${isActive ? active : idle} ${hover}`;
}

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  const isHome = location.pathname === "/";

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero visibility (requires id="home-hero" on the hero <section>)
  useEffect(() => {
    if (!isHome) {
      setHeroVisible(false);
      return;
    }

    const el = document.getElementById("home-hero");
    if (!el) {
      setHeroVisible(false);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [isHome]);

  // We treat "home top" as: on homepage, not scrolled, hero is visible
  const homeTop = isHome && !scrolled && heroVisible;

  // Text color:
  // - If hero is behind header => white
  // - Otherwise => black (this fixes your “top is still white, I need black” issue)
  const textColor = homeTop ? "text-white" : "text-black";

  // Header background:
  // - If hero behind => transparent (Cosmos style)
  // - Otherwise => light glass so black text is visible
  const headerClass = useMemo(() => {
    if (homeTop) {
      return "fixed top-0 left-0 right-0 z-50 bg-transparent";
    }
    return (
      "fixed top-0 left-0 right-0 z-50 " +
      "bg-white/75 backdrop-blur-xl border-b border-black/10 " +
      "shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
    );
  }, [homeTop]);

  // “Spread to the sides” animation (home only)
  // At top: brand + nav move towards center a bit
  // After scroll: they slide back to normal edges
  const brandMotion = useMemo(() => {
    if (isHome && !scrolled) return "translate-x-24";
    return "translate-x-0";
  }, [isHome, scrolled]);

  const navMotion = useMemo(() => {
    if (isHome && !scrolled) return "-translate-x-24";
    return "translate-x-0";
  }, [isHome, scrolled]);

  return (
    <>
      {/* Spacer so content doesn’t go under fixed header */}
      <div className="h-16" />

      <header className={headerClass}>
        <div className="container flex h-16 items-center justify-between">
          {/* Brand */}
          <NavLink
            to="/"
            className={`flex items-center gap-2 transition-transform duration-500 ${brandMotion}`}
          >
            <span className="h-9 w-9 rounded-xl bg-black/10 border border-black/10 grid place-items-center">
              <span className={`text-sm font-extrabold ${textColor}`}>FH</span>
            </span>
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-300 ${textColor}`}
            >
              FreelanceHub
            </span>
          </NavLink>

          {/* Nav */}
          <nav
            className={`flex items-center gap-2 transition-transform duration-500 ${navMotion}`}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => navItemClass(isActive, textColor)}
            >
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    navItemClass(isActive, textColor)
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    navItemClass(isActive, textColor)
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/jobs"
                  end
                  className={({ isActive }) =>
                    navItemClass(isActive, textColor)
                  }
                >
                  Jobs
                </NavLink>

                {user.role === "client" && (
                  <NavLink
                    to="/jobs/create"
                    className={({ isActive }) =>
                      navItemClass(isActive, textColor)
                    }
                  >
                    Create Job
                  </NavLink>
                )}

                <NavLink
                  to="/contracts"
                  className={({ isActive }) =>
                    navItemClass(isActive, textColor)
                  }
                >
                  Contracts
                </NavLink>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${textColor} hover:bg-black hover:text-white`}
                  >
                    Admin
                  </Link>
                )}

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    navItemClass(isActive, textColor)
                  }
                >
                  Profile
                </NavLink>

                {/* user chip */}
                <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-black/10">
                  <div className="h-9 w-9 rounded-xl bg-black/10 border border-black/10 grid place-items-center">
                    <span className={`text-xs font-bold ${textColor}`}>
                      {user.name?.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className={`text-sm font-semibold ${textColor}`}>
                      {user.name}
                    </p>
                    <p className="text-xs text-black/50">{user.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={logout}
                    className="ml-2 inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold
                      bg-black/10 border border-black/10 text-black
                      transition-all duration-200 ease-out transform-gpu
                      hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/25"
                  >
                    Logout
                  </button>
                </div>

                {/* mobile logout */}
                <button
                  type="button"
                  onClick={logout}
                  className="sm:hidden inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold
                    bg-black/10 border border-black/10 text-black
                    transition-all duration-200 ease-out transform-gpu
                    hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/25"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
