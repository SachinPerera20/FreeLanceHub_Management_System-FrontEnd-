import React from "react";
import { useFreelancer } from "../context/FreelancerContext";

interface SidebarProps {
  activeSection: "dashboard" | "projects" | "clients" | "messages" | "earnings";
  setActiveSection: (section: "dashboard" | "projects" | "clients" | "messages" | "earnings") => void;
  onLogout: () => void;
}

const styles: { [k: string]: React.CSSProperties } = {
  sidebar: { width: 280, background: "#0f172a", color: "white", padding: 24, boxSizing: "border-box", overflowY: "auto", display: "flex", flexDirection: "column", flexShrink: 0 },
  logo: { width: 48, height: 48, borderRadius: 12, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 },
  userSection: { display: "flex", gap: 12, background: "#1e293b", padding: 12, borderRadius: 12, marginTop: 20 },
  userAvatar: { width: 48, height: 48, borderRadius: 8, background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 },
  nav: { display: "flex", flexDirection: "column", gap: 8, marginTop: 24, marginBottom: "auto" },
  navLink: { padding: "12px 12px", borderRadius: 8, color: "#cbd5e1", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "all 0.2s", border: "none", background: "transparent", cursor: "pointer", textAlign: "left", width: "100%" },
  logoutBtn: { background: "#ef4444", color: "white", padding: "10px 16px", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 },
};

type SectionType = "dashboard" | "projects" | "clients" | "messages" | "earnings";

export function Sidebar({ activeSection, setActiveSection, onLogout }: SidebarProps) {
  const { freelancer } = useFreelancer();

  if (!freelancer) return null;

  const initials = freelancer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const navItems: { label: string; icon: string; key: SectionType }[] = [
    { label: "Dashboard", icon: "📊", key: "dashboard" },
    { label: "My Projects", icon: "📁", key: "projects" },
    { label: "Clients", icon: "👥", key: "clients" },
    { label: "Messages", icon: "💬", key: "messages" },
    { label: "Earnings", icon: "💰", key: "earnings" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>FL</div>
      <h3 style={{ margin: "16px 0 6px", fontSize: 16, fontWeight: 700, color: "white" }}>Freelancer Hub</h3>
      <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Manage your projects</p>

      <div style={styles.userSection}>
        <div style={styles.userAvatar}>{initials}</div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "white" }}>{freelancer.name}</p>
          <p style={{ margin: 0, fontSize: 11, color: "#cbd5e1" }}>{freelancer.email}</p>
        </div>
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveSection(item.key)}
            style={{
              ...styles.navLink,
              ...(activeSection === item.key ? { background: "#1e40af", color: "white" } : {}),
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <button onClick={onLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </aside>
  );
}
