import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-zinc-100 text-zinc-900">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-72 -left-72 h-[60rem] w-[60rem] rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-80 -right-80 h-[64rem] w-[64rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1300px_700px_at_5%_0%,rgba(79,70,229,0.18),transparent_60%),radial-gradient(1300px_700px_at_95%_100%,rgba(6,182,212,0.16),transparent_65%)]" />

      <Header />

      {/* Home should be FULL width. Other pages can be container */}
      <main className={isHome ? "relative" : "relative container py-8"}>
        <Outlet />
      </main>
    </div>
  );
}
