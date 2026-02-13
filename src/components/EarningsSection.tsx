import React from "react";

interface Project {
  id: number;
  name: string;
  client: string;
  due: string;
  status: "In Progress" | "Pending Review" | "Completed";
  earned: number;
  progress: number;
}

interface EarningsSectionProps {
  projects: Project[];
}

const styles: { [k: string]: React.CSSProperties } = {
  header: { marginBottom: 48, width: "100%", display: "flex", flexDirection: "column" },
  projectSection: { background: "white", borderRadius: 14, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 32, flex: 1, display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  statBoxSmall: { background: "white", padding: 24, borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", width: "100%", boxSizing: "border-box" },
};

export function EarningsSection({ projects }: EarningsSectionProps) {
  const totalEarned = projects.reduce((sum, p) => sum + p.earned, 0);

  return (
    <>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>Earnings</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Track your income and payments</p>
      </header>
      <section style={styles.projectSection}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ ...styles.statBoxSmall, background: "white", borderLeft: "4px solid #3b82f6" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Total Earned</p>
            <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, color: "#059669" }}>${totalEarned.toLocaleString()}</p>
          </div>
          <div style={{ ...styles.statBoxSmall, background: "white", borderLeft: "4px solid #f59e0b" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Pending</p>
            <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, color: "#f59e0b" }}>$4,200</p>
          </div>
          <div style={{ ...styles.statBoxSmall, background: "white", borderLeft: "4px solid #10b981" }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>This Month</p>
            <p style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 700, color: "#10b981" }}>$2,350</p>
          </div>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent Transactions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#111827" }}>{project.name}</p>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>{project.client}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#059669" }}>+${project.earned.toLocaleString()}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#6b7280" }}>{project.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
