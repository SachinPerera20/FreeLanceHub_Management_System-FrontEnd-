import React, { createContext, useContext, useMemo, useState } from "react";

type AppliedJobsContextType = {
    appliedJobIds: string[];
    applyToJob: (jobId: string) => void;
    isApplied: (jobId: string) => boolean;
    removeApplication: (jobId: string) => void;
  };

  const AppliedJobsContext = createContext<AppliedJobsContextType | undefined>(undefined);