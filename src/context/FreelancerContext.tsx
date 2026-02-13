import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface FreelancerData {
  id: string;
  name: string;
  email: string;
  title?: string;
  avatar?: string;
  totalEarned?: number;
  completionRate?: number;
  activeProjects?: number;
}

export interface FreelancerContextType {
  freelancer: FreelancerData | null;
  setFreelancer: (data: FreelancerData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const FreelancerContext = createContext<FreelancerContextType | undefined>(undefined);

export function FreelancerProvider({ children }: { children: ReactNode }) {
  const [freelancer, setFreelancer] = useState<FreelancerData | null>(() => {
    const stored = localStorage.getItem("freelancer");
    return stored ? JSON.parse(stored) : null;
  });

  const handleSetFreelancer = (data: FreelancerData) => {
    setFreelancer(data);
    localStorage.setItem("freelancer", JSON.stringify(data));
  };

  const logout = () => {
    setFreelancer(null);
    localStorage.removeItem("freelancer");
  };

  return (
    <FreelancerContext.Provider value={{ freelancer, setFreelancer: handleSetFreelancer, logout, isAuthenticated: !!freelancer }}>
      {children}
    </FreelancerContext.Provider>
  );
}

export function useFreelancer() {
  const context = React.useContext(FreelancerContext);
  if (!context) throw new Error("useFreelancer must be used within FreelancerProvider");
  return context;
}
