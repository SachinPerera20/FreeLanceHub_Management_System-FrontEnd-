import React, { useState } from "react";
import { StatCard } from "./StatCard";
import { StatusBadge } from "./StatusBadge";
import { ProjectProgressBar } from "./ProjectProgressBar";

interface Project {
  id: number;
  name: string;
  client: string;
  due: string;
  status: "In Progress" | "Pending Review" | "Completed";
  earned: number;
  progress: number;
}

interface DashboardSectionProps {
  projects: Project[];
  freelancerName: string;
}

const styles: { [k: string]: React.CSSProperties } = {
  header: { marginBottom: 48, width: "100%", display: "flex", flexDirection: "column" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, marginBottom: 40, width: "100%" },
  projectSection: { background: "white", borderRadius: 14, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 32, flex: 1, display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 20, width: "100%" },
  filterButtons: { display: "flex", gap: 8 },
  filterBtn: { padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", background: "white", cursor: "pointer", fontWeight: 500, fontSize: 13, transition: "all 0.2s" },
  filterBtnActive: { background: "#3b82f6", color: "white", borderColor: "#3b82f6" },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, flex: 1, width: "100%" },
  projectCard: { border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, background: "#f8fafc", transition: "all 0.3s", display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectDetails: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 20, paddingTop: 20, borderTop: "1px solid #e2e8f0", width: "100%" },
  projectActionBtn: { flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: "#0f172a", color: "white", cursor: "pointer", fontWeight: 500, fontSize: 12 },
  quickStats: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginTop: 40, width: "100%" },
  statBoxSmall: { background: "white", padding: 24, borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
};

export function DashboardSection({ projects, freelancerName }: DashboardSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "in-progress") return p.status !== "Completed";
    if (selectedFilter === "completed") return p.status === "Completed";
    return true;
  });

  const totalEarned = projects.reduce((sum, p) => sum + p.earned, 0);
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const inProgressCount = projects.filter((p) => p.status !== "Completed").length;

  return (
    <>
      <header style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>Welcome back, {freelancerName}! 👋</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Here's what's happening with your projects today.</p>
        </div>
      </header>

      <section style={styles.statsGrid}>
        <StatCard label="Total Earned" value={`$${totalEarned.toLocaleString()}`} subtext="All time" />
        <StatCard label="Active Projects" value={inProgressCount} subtext="In progress" />
        <StatCard label="Completed" value={completedCount} subtext="This month" />
        <StatCard label="Profile Rating" value="4.9" subtext="out of 5 stars" />
      </section>

      <section style={styles.projectSection}>
        <div style={styles.projectHeader}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your Projects</h2>
            <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 13 }}>Track and manage all your active and completed work</p>
          </div>
          <div style={styles.filterButtons}>
            <button onClick={() => setSelectedFilter("all")} style={{ ...styles.filterBtn, ...(selectedFilter === "all" ? styles.filterBtnActive : {}) }}>
              All
            </button>
            <button onClick={() => setSelectedFilter("in-progress")} style={{ ...styles.filterBtn, ...(selectedFilter === "in-progress" ? styles.filterBtnActive : {}) }}>
              In Progress
            </button>
            <button onClick={() => setSelectedFilter("completed")} style={{ ...styles.filterBtn, ...(selectedFilter === "completed" ? styles.filterBtnActive : {}) }}>
              Completed
            </button>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#6b7280" }}>No projects found.</div>
        ) : (
          <div style={styles.projectsGrid}>
            {filteredProjects.map((project) => (
              <div key={project.id} style={styles.projectCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#111827" }}>{project.name}</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{project.client}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <ProjectProgressBar progress={project.progress} />

                <div style={styles.projectDetails}>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Due Date</p>
                    <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 600, color: "#111827" }}>{project.due}</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Earned</p>
                    <p style={{ margin: "4px 0 0", fontSize: 13, fontWeight: 600, color: "#059669" }}>${project.earned.toLocaleString()}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button style={styles.projectActionBtn}>View Details</button>
                  <button style={{ ...styles.projectActionBtn, background: "#f0f9ff", color: "#0369a1" }}>Message</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={styles.quickStats}>
        <div style={{ ...styles.statBoxSmall, borderLeft: "4px solid #3b82f6" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Next Payout</p>
          <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 700 }}>$2,850</p>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#6b7280" }}>Due in 5 days</p>
        </div>
        <div style={{ ...styles.statBoxSmall, borderLeft: "4px solid #f59e0b" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Pending Invoices</p>
          <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 700 }}>3</p>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#6b7280" }}>Total: $4,200</p>
        </div>
        <div style={{ ...styles.statBoxSmall, borderLeft: "4px solid #10b981" }}>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Response Time</p>
          <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 700 }}>2h</p>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#6b7280" }}>Average</p>
        </div>
      </section>
    </>
  );
}
