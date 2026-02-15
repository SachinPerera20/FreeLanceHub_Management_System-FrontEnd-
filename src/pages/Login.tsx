import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type NavState = {
  intent?: "apply" | "proposal";
  forceRole?: "freelancer";
  from?: string;
  jobId?: string;
};

export default function Login() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navState = (location.state ?? {}) as NavState;
  const redirectTo = navState.from ?? "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, password });
      navigate(redirectTo);
    } catch {
      // handled in context
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="rounded-2xl border bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">Login</h1>

        {navState.forceRole === "freelancer" ? (
          <div className="mt-4 rounded-xl border bg-amber-50 px-4 py-3 text-amber-900">
            Login with a <b>freelancer</b> account to continue.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg bg-rose-50 px-4 py-3 text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-zinc-600 text-center">
            No account?{" "}
            <Link to="/register" state={navState} className="underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
