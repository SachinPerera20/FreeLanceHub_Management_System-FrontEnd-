import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAuth } from "../../hooks/useAuth";
import { useProposals } from "../../context/ProposalsContext";