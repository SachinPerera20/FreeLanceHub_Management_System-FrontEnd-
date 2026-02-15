import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useProposals } from "../../context/ProposalsContext";
import { useContracts } from "../../context/ContractsContext";

export default function AdminDashboardPage() {
  const { jobs } = useJobs(); // <- this is MockJob[] in your project
  const { proposals } = useProposals();
  const { contracts } = useContracts();

  // infer the job item type from the hook (NO any, NO wrong Job import)
  type JobItem = (typeof jobs)[number];

  const getJobStatus = (job: JobItem) => {
    // support both possible fields (mock vs full type)
    const maybe = job as JobItem & { status?: string };
    return maybe.status;
  };

  const getJobCreatedAt = (job: JobItem) => {
    const maybe = job as JobItem & { createdAt?: string; updatedAt?: string };
    return maybe.createdAt ?? maybe.updatedAt ?? "";
  };

  const getClientLabel = (job: JobItem) => {
    const maybe = job as JobItem & { clientName?: string; createdBy?: string; clientId?: string };
    return maybe.clientName ?? maybe.createdBy ?? maybe.clientId ?? "—";
  };

  const stats = useMemo(() => {
    const allJobs = jobs.length;
    const openJobs = jobs.filter((j) => getJobStatus(j) === "open").length;
    const inProgressJobs = jobs.filter((j) => getJobStatus(j) === "in_progress").length;

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
      .sort((a, b) => {
        const aTime = Date.parse(getJobCreatedAt(a)) || 0;
        const bTime = Date.parse(getJobCreatedAt(b)) || 0;
        return bTime - aTime;
      })
      .slice(0, 6);
  }, [jobs]);

  const latestProposals = useMemo(() => {
    return [...proposals]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 6);
  }, [proposals]);

  const latestContracts = useMemo(() => {
    return [...contracts]
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

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total Jobs" value={stats.allJobs} />
        <Kpi label="Open Jobs" value={stats.openJobs} />
        <Kpi label="Total Proposals" value={stats.totalProposals} />
        <Kpi label="Active Contracts" value={stats.activeContracts} />
      </div>

      {/* PANELS */}
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
                      Client: {getClientLabel(j)} • Budget: ${j.budget}
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
    <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 shadow-sm">
      <p className="text-xs text-zinc-600">{label}</p>
      <p className="text-2xl font-extrabold text-zinc-950 mt-2">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 shadow-sm">
      <h2 className="font-bold text-zinc-950 mb-4">{title}</h2>
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
