import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { JobsProvider } from './context/JobsContext';
import { AppliedJobsProvider } from "./context/AppliedJobsContext";
import { ProposalsProvider } from "./context/ProposalsContext";


const el = document.getElementById('root');

if (!el) {
  throw new Error("Root element '#root' not found. Check index.html.");
}

createRoot(el).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <JobsProvider>
      <AppliedJobsProvider>
        <ProposalsProvider>
          <App />
        </ProposalsProvider>
      </AppliedJobsProvider>
     </JobsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
