import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useProposals } from "../../context/ProposalsContext";
import { useContracts } from "../../context/ContractsContext";

function getClientLabel(job: { clientName?: string; createdBy?: string; clientId?: string }) {
    return job.clientName ?? job.createdBy ?? job.clientId ?? "—";
  }
  

export default function AdminDashboardPage() {
  const { jobs } = useJobs();
  const { proposals } = useProposals();
  const { contracts } = useContracts();

  const stats = useMemo(() => {
    const allJobs = jobs.length;

    const openJobs = jobs.filter((j) => (j as any).status === "open").length; // if status exists
    const inProgressJobs = jobs.filter((j) => (j as any).status === "in_progress").length;

    const totalProposals = proposals.length;
    const pendingProposals = proposals.filter((p) => p.status === "pending").length;

    const totalContracts = contracts.length;
    const activeContracts = contracts.filter((c) => c.status === "active").length;
    const completedContracts = contracts.filter((c) => c.status === "completed").length;

    return {
      allJobs,
      openJobs,
      inProgressJobs,
      totalProposals,
      pendingProposals,
      totalContracts,
      activeContracts,
      completedContracts,
    };
  }, [jobs, proposals, contracts]);

  const latestJobs = useMemo(() => {
    return [...jobs]
      .slice()
      .reverse()
      .slice(0, 6);
  }, [jobs]);

  const latestProposals = useMemo(() => {
    return [...proposals]
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 6);
  }, [proposals]);

  const latestContracts = useMemo(() => {
    return [...contracts]
      .slice()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 6);
  }, [contracts]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950">
            Admin Dashboard
          </h1>
          <p className="text-sm text-zinc-600 mt-2">
            System overview across jobs, proposals, and contracts.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/jobs"
            className="px-4 py-2 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition"
          >
            View Jobs
          </Link>
          <Link
            to="/contracts"
            className="px-4 py-2 rounded-xl bg-white border border-black/10 font-semibold hover:bg-black hover:text-white transition"
          >
            View Contracts
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total Jobs" value={stats.allJobs} />
        <Kpi label="Open Jobs" value={stats.openJobs} />
        <Kpi label="Total Proposals" value={stats.totalProposals} />
        <Kpi label="Active Contracts" value={stats.activeContracts} />
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Latest Jobs">
          {latestJobs.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-3">
              {latestJobs.map((j) => (
                <div key={j.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-950 truncate">{j.title}</p>
                    <p className="text-xs text-zinc-600 truncate">
                      Client: {(j as any).clientName ?? "—"} • Budget: ${j.budget}
                    </p>
                  </div>
                  <Link
                    to={`/jobs/${j.id}`}
                    className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Latest Proposals">
          {latestProposals.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-3">
              {latestProposals.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-950 truncate">{p.freelancerName}</p>
                    <p className="text-xs text-zinc-600 truncate">
                      Job: {p.jobId} • ${p.proposedBudget} • {p.status}
                    </p>
                  </div>
                  <Link
                    to={`/jobs/${p.jobId}/proposals`}
                    className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel title="Latest Contracts">
          {latestContracts.length === 0 ? (
            <Empty />
          ) : (
            <div className="space-y-3">
              {latestContracts.map((c) => (
                <div key={c.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-950 truncate">{c.title}</p>
                    <p className="text-xs text-zinc-600 truncate">
                      {c.status} • ${c.totalAmount}
                    </p>
                  </div>
                  <Link
                    to={`/contracts/${c.id}`}
                    className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm">
      <p className="text-xs text-zinc-600">{label}</p>
      <p className="text-2xl font-extrabold text-zinc-950 mt-2">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-zinc-950">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-xl bg-zinc-50 border border-black/10 p-4 text-sm text-zinc-700">
      No data yet.
    </div>
  );
}
