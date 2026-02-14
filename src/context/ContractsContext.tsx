import React, { createContext, useContext, useMemo, useState } from "react";
import type { Contract } from "../types/contract.types";

const STORAGE_KEY = "freelancehub_contracts";

type CreateContractInput = Omit<Contract, "id" | "createdAt" | "status">;

type ContractsContextValue = {
  contracts: Contract[];
  addContract: (data: CreateContractInput) => Contract;
  getContractsByUser: (userId: string) => Contract[];
};

const ContractsContext = createContext<ContractsContextValue | undefined>(
    undefined
  );


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

  export function ContractsProvider({ children }: { children: React.ReactNode }) {
    const [contracts, setContracts] = useState<Contract[]>(() =>
      safeParseContracts(localStorage.getItem(STORAGE_KEY))
    );
  
    const addContract: ContractsContextValue["addContract"] = (data) => {
      const newContract: Contract = {
        id: generateContractId(),
        ...data,
        status: "active",
        createdAt: new Date().toISOString(),
      };
  
      setContracts((prev) => {
        const updated = [newContract, ...prev];
        saveContracts(updated);
        return updated;
      });
      return newContract;
    };

    const getContractsByUser: ContractsContextValue["getContractsByUser"] = (
        userId
      ) => {
        return contracts.filter(
          (c) => c.clientId === userId || c.freelancerId === userId
        );
      };

      const value = useMemo<ContractsContextValue>(
        () => ({
          contracts,
          addContract,
          getContractsByUser,
        }),
        [contracts]
      );

      return (
        <ContractsContext.Provider value={value}>
          {children}
        </ContractsContext.Provider>
      );
    }
    
    export function useContracts() {
      const ctx = useContext(ContractsContext);
      if (!ctx) throw new Error("useContracts must be used inside ContractsProvider");
      return ctx;
    }