import React from "react";

interface ClientsSectionProps {}

const styles: { [k: string]: React.CSSProperties } = {
  header: { marginBottom: 48, width: "100%", display: "flex", flexDirection: "column" },
  projectSection: { background: "white", borderRadius: 14, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 32, flex: 1, display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectCard: { border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, background: "#f8fafc", transition: "all 0.3s", display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectActionBtn: { flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: "#0f172a", color: "white", cursor: "pointer", fontWeight: 500, fontSize: 12 },
};

const clients = [
  { name: "TechCorp Inc.", projects: 1, status: "Active" },
  { name: "StartupXYZ", projects: 1, status: "Active" },
  { name: "MediaHub", projects: 1, status: "Active" },
  { name: "BrandCo", projects: 1, status: "Completed" },
];

export function ClientsSection({}: ClientsSectionProps) {
  return (
    <>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>My Clients</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Manage relationships with your clients</p>
      </header>
      <section style={styles.projectSection}>
        <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700 }}>Active Clients</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {clients.map((client, idx) => (
            <div key={idx} style={{ ...styles.projectCard, background: "white" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "#111827" }}>{client.name}</h3>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: "#6b7280" }}>Total Projects: {client.projects}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: client.status === "Active" ? "#059669" : "#6b7280" }}>{client.status}</span>
                <button style={{ ...styles.projectActionBtn, flex: "none", padding: "6px 12px" }}>Contact</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
