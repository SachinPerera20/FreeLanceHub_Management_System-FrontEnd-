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