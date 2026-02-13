import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

const styles: React.CSSProperties = {
  background: "white",
  padding: "28px 24px",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  border: "1px solid #e2e8f0",
  width: "100%",
  boxSizing: "border-box",
};

export function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div style={styles}>
      <p style={{ margin: "0 0 8px 0", fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>{value}</p>
      {subtext && <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "#9ca3af" }}>{subtext}</p>}
    </div>
  );
}
