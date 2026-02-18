import React, {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { STORAGE_KEYS, readStore, writeStore } from "../lib/storage";
import { useAuth } from "./auth";
interface AppliedSavedState {
  appliedJobs: string[];
  savedJobs: string[];
  addApplied: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  removeApplied: (jobId: string) => void;
  toggleSaved: (jobId: string) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isApplied: (jobId: string) => boolean;
  isSaved: (jobId: string) => boolean;
}
const AppliedSavedContext = createContext<AppliedSavedState | undefined>(
  undefined,
);
export function AppliedSavedProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  useEffect(() => {
    if (!user) {
      setAppliedJobs([]);
      setSavedJobs([]);
      return;
    }
    setAppliedJobs(
      readStore<Record<string, string[]>>(STORAGE_KEYS.APPLIED_JOBS, {})[
        user.id
      ] || [],
    );
    setSavedJobs(
      readStore<Record<string, string[]>>(STORAGE_KEYS.SAVED_JOBS, {})[
        user.id
      ] || [],
    );
  }, [user]);
  const persist = useCallback((key: string, userId: string, list: string[]) => {
    const all = readStore<Record<string, string[]>>(key, {});
    all[userId] = list;
    writeStore(key, all);
  }, []);
  const addApplied = useCallback(
    (jobId: string) => {
      if (!user) return;
      setAppliedJobs((prev) => {
        if (prev.includes(jobId)) return prev;
        const next = [...prev, jobId];
        persist(STORAGE_KEYS.APPLIED_JOBS, user.id, next);
        return next;
      });
    },
    [user, persist],
  );
  const removeApplied = useCallback(
    (jobId: string) => {
      if (!user) return;
      setAppliedJobs((prev) => {
        const next = prev.filter((id) => id !== jobId);
        persist(STORAGE_KEYS.APPLIED_JOBS, user.id, next);
        return next;
      });
    },
    [user, persist],
  );
  const toggleSaved = useCallback(
    (jobId: string) => {
      if (!user) return;
      setSavedJobs((prev) => {
        const next = prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId];
        persist(STORAGE_KEYS.SAVED_JOBS, user.id, next);
        return next;
      });
    },
    [user, persist],
  );
  const saveJob = useCallback(
    (jobId: string) => {
      if (!user) return;
      setSavedJobs((prev) => {
        if (prev.includes(jobId)) return prev;
        const next = [...prev, jobId];
        persist(STORAGE_KEYS.SAVED_JOBS, user.id, next);
        return next;
      });
    },
    [user, persist],
  );
  const unsaveJob = useCallback(
    (jobId: string) => {
      if (!user) return;
      setSavedJobs((prev) => {
        const next = prev.filter((id) => id !== jobId);
        persist(STORAGE_KEYS.SAVED_JOBS, user.id, next);
        return next;
      });
    },
    [user, persist],
  );
  const isApplied = useCallback(
    (jobId: string) => appliedJobs.includes(jobId),
    [appliedJobs],
  );
  const isSaved = useCallback(
    (jobId: string) => savedJobs.includes(jobId),
    [savedJobs],
  );
  return (
    <AppliedSavedContext.Provider
      value={{
        appliedJobs,
        savedJobs,
        addApplied,
        applyToJob: addApplied,
        removeApplied,
        toggleSaved,
        saveJob,
        unsaveJob,
        isApplied,
        isSaved,
      }}
    >
      {children}
    </AppliedSavedContext.Provider>
  );
}
export function useAppliedSaved(): AppliedSavedState {
  const ctx = useContext(AppliedSavedContext);
  if (!ctx)
    throw new Error("useAppliedSaved must be used within AppliedSavedProvider");
  return ctx;
}
