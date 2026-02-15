import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen relative text-zinc-900">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_650px_at_15%_-10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(1000px_600px_at_90%_0%,rgba(16,185,129,0.14),transparent_55%)]" />

      <Header />

      {/* ✅ IMPORTANT:
          - Home: no container (full width)
          - Others: container */}
      {isHome ? (
        <main className="relative">
          <Outlet />
        </main>
      ) : (
        <main className="container py-8 relative">
          <Outlet />
        </main>
      )}
    </div>
  );
}
