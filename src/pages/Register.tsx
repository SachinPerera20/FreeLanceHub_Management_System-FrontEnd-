import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type NavState = {
  intent?: "apply" | "proposal";
  forceRole?: "freelancer";
  from?: string;
  jobId?: string;
};

export default function Register() {
  const { register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navState = (location.state ?? {}) as NavState;

  const forcedFreelancer = navState.forceRole === "freelancer";

  const redirectTo = useMemo(() => {
    return navState.from ?? "/profile";
  }, [navState.from]);

  // ✅ no useEffect needed (avoids the warning)
  const [role, setRole] = useState<"client" | "freelancer">(
    forcedFreelancer ? "freelancer" : "client"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await register({
        name,
        email,
        password,
        role: forcedFreelancer ? "freelancer" : role,
      });

      navigate(redirectTo);
    } catch {
      // handled in auth context
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="rounded-2xl border bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">Register</h1>

        {forcedFreelancer ? (
          <div className="mt-4 rounded-xl border bg-amber-50 px-4 py-3 text-amber-900">
            <p className="font-semibold">Freelancer account required</p>
            <p className="text-sm mt-1">
              To apply or submit proposals, you must register as a{" "}
              <b>freelancer</b>. Already have a freelancer account?{" "}
              <Link to="/login" state={navState} className="underline font-semibold">
                Login here
              </Link>
              .
            </p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

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

          <div className="space-y-2">
            <label className="block text-sm font-medium">Role</label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "freelancer"}
                onChange={() => setRole("freelancer")}
              />
              <span>Freelancer</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "client"}
                onChange={() => setRole("client")}
                disabled={forcedFreelancer}
              />
              <span className={forcedFreelancer ? "text-zinc-400" : ""}>Client</span>
            </label>

            {forcedFreelancer ? (
              <p className="text-xs text-zinc-500">
                Client role is disabled because you came from Apply/Proposal.
              </p>
            ) : null}
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
            {isLoading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm text-zinc-600 text-center">
            Already have an account?{" "}
            <Link to="/login" state={navState} className="underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
