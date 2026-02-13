import React from "react";

interface ProjectProgressBarProps {
  progress: number;
}

export function ProjectProgressBar({ progress }: ProjectProgressBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#3b82f6", transition: "width 0.3s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", minWidth: 40 }}>{progress}%</span>
    </div>
  );
}
