/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useMemo, useState } from "react";
import type { Contract, CreateContractData, ContractStatus, PaymentStatus } from "../types/contract.types";

const STORAGE_KEY = "freelancehub_contracts";

type CreateContractInput = CreateContractData & {
  clientId: string;
  freelancerId: string;
  clientName?: string;
  freelancerName?: string;
};

type ContractsContextValue = {
  contracts: Contract[];
  addContract: (data: CreateContractInput) => Contract;
  getContractsByUser: (userId: string) => Contract[];
  getContractById: (id: string) => Contract | undefined;
};

const ContractsContext = createContext<ContractsContextValue | undefined>(undefined);

function safeParseContracts(raw: string | null): Contract[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Contract[];
  } catch {
    return [];
  }
}

function saveContracts(contracts: Contract[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contracts));
}

function generateContractId() {
  return `ctr_${Math.random().toString(16).slice(2, 8)}_${Date.now()}`;
}

function generateMilestoneId() {
  return `ms_${Math.random().toString(16).slice(2, 8)}_${Date.now()}`;
}

export function ContractsProvider({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>(() =>
    safeParseContracts(localStorage.getItem(STORAGE_KEY))
  );

  const addContract: ContractsContextValue["addContract"] = (data) => {
    const now = new Date().toISOString();

    const status: ContractStatus = "active";
    const paymentStatus: PaymentStatus = "pending";

    const newContract: Contract = {
      id: generateContractId(),
      jobId: data.jobId,
      proposalId: data.proposalId,

      clientId: data.clientId,
      freelancerId: data.freelancerId,
      clientName: data.clientName,
      freelancerName: data.freelancerName,

      title: data.title,
      description: data.description,
      totalAmount: data.totalAmount,

      status,
      startDate: data.startDate,
      endDate: data.endDate,

      paymentStatus,

      terms: data.terms,

      milestones: data.milestones?.map((m) => ({
        id: generateMilestoneId(),
        title: m.title,
        description: m.description,
        amount: m.amount,
        dueDate: m.dueDate,
        status: "pending",
      })),

      createdAt: now,
      updatedAt: now,
    };

    setContracts((prev) => {
      const updated = [newContract, ...prev];
      saveContracts(updated);
      return updated;
    });

    return newContract;
  };

  const getContractsByUser: ContractsContextValue["getContractsByUser"] = (userId) => {
    return contracts.filter((c) => c.clientId === userId || c.freelancerId === userId);
  };

  const getContractById: ContractsContextValue["getContractById"] = (id) => {
    return contracts.find((c) => c.id === id);
  };

  const value = useMemo<ContractsContextValue>(
    () => ({
      contracts,
      addContract,
      getContractsByUser,
      getContractById,
    }),
    [contracts]
  );

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>;
}

export function useContracts() {
  const ctx = useContext(ContractsContext);
  if (!ctx) throw new Error("useContracts must be used inside ContractsProvider");
  return ctx;
}
