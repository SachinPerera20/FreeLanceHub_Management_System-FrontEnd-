import { Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';
import ProtectedRoute from './components/ui/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import JobListPage from './pages/jobs/JobListPage';
import CreateJobPage from './pages/jobs/CreateJobPage';
import ContractListPage from './pages/contracts/ContractListPage';
import JobDetailsPage from './pages/jobs/JobDetailsPage';

export default function App() {
  return (
    <Routes>
      {/* Shared layout wrapper */}
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route path="profile"    element={<ProtectedRoute><Profile /></ProtectedRoute> } />


        <Route path="jobs" element={<JobListPage />} />

      <Route path="jobs/create" element={<ProtectedRoute requiredRole="client"> <CreateJobPage /></ProtectedRoute> } />

      <Route path="contracts" element= {<ProtectedRoute> <ContractListPage /> </ProtectedRoute>}/>

      <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

      </Route>

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
