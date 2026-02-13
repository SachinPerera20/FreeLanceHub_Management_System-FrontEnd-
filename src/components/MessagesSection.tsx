import React from "react";

interface MessagesSectionProps {}

const styles: { [k: string]: React.CSSProperties } = {
  header: { marginBottom: 48, width: "100%", display: "flex", flexDirection: "column" },
  projectSection: { background: "white", borderRadius: 14, padding: 36, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 32, flex: 1, display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectCard: { border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, background: "#f8fafc", transition: "all 0.3s", display: "flex", flexDirection: "column", width: "100%", boxSizing: "border-box" },
  projectActionBtn: { flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: "#0f172a", color: "white", cursor: "pointer", fontWeight: 500, fontSize: 12 },
};

const messages = [
  { sender: "TechCorp Inc.", message: "When can you deliver the updated designs?", time: "2 hours ago", unread: true },
  { sender: "StartupXYZ", message: "Great work on the mobile app!", time: "1 day ago", unread: false },
  { sender: "MediaHub", message: "Please review the content draft", time: "2 days ago", unread: false },
];

export function MessagesSection({}: MessagesSectionProps) {
  return (
    <>
      <header style={styles.header}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>Messages</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Your conversations with clients and team</p>
      </header>
      <section style={styles.projectSection}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ ...styles.projectCard, background: msg.unread ? "#f0f9ff" : "#f8fafc", borderLeft: msg.unread ? "4px solid #3b82f6" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111827" }}>{msg.sender}</h3>
                <span style={{ fontSize: 11, color: "#6b7280" }}>{msg.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{msg.message}</p>
              {msg.unread && (
                <button style={{ ...styles.projectActionBtn, marginTop: 12, flex: "none", padding: "6px 12px" }}>Reply</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
