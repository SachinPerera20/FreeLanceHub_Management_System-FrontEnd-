import React from "react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    "In Progress": { bg: "#dbeafe", text: "#1e40af" },
    "Pending Review": { bg: "#fed7aa", text: "#92400e" },
    Completed: { bg: "#bbf7d0", text: "#065f46" },
  };
  const color = colors[status] || colors["In Progress"];
  
  const styles: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    background: color.bg,
    color: color.text,
  };
  
  return <span style={styles}>{status}</span>;
}
