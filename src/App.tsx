import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation } from
'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './state/auth';
import { JobsProvider } from './state/jobs';
import { ProposalsProvider } from './state/proposals';
import { ContractsProvider } from './state/contracts';
import { AppliedSavedProvider } from './state/appliedSaved';
import { NotificationsProvider } from './state/notifications';
import { ChatProvider } from './state/chat';
import { PaymentsProvider } from './state/payments';
import { ProtectedRoute } from './components/ui/ProtectedRoute';
import { PageTransition } from './components/ui/PageTransition';
import { ScrollToTop } from './components/ui/ScrollToTop';
// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { Jobs } from './pages/jobs/Jobs';
import { JobDetails } from './pages/jobs/JobDetails';
import { CreateJob } from './pages/jobs/CreateJob';
import { MyJobs } from './pages/jobs/MyJobs';
import { AppliedJobs } from './pages/jobs/AppliedJobs';
import { SavedJobs } from './pages/jobs/SavedJobs';
import { Contracts } from './pages/contracts/Contracts';
import { ContractDetails } from './pages/contracts/ContractDetails';
import { Chat } from './pages/chat/Chat';
import { ChatRoom } from './pages/chat/ChatRoom';
import { Notifications } from './pages/notifications/Notifications';
import { Checkout } from './pages/payments/Checkout';
import { Result } from './pages/payments/Result';
import { Dashboard } from './pages/admin/Dashboard';
import { Users } from './pages/admin/Users';
import { AdminJobs } from './pages/admin/Jobs';
import { AdminProposals } from './pages/admin/Proposals';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Cookies } from './pages/Cookies';
// Wrapper component to handle location-based transitions
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
          <PageTransition>
              <Home />
            </PageTransition>
          } />

        <Route
          path="/login"
          element={
          <PageTransition>
              <Login />
            </PageTransition>
          } />

        <Route
          path="/register"
          element={
          <PageTransition>
              <Register />
            </PageTransition>
          } />


        {/* Static Pages */}
        <Route
          path="/how-it-works"
          element={
          <PageTransition>
              <HowItWorks />
            </PageTransition>
          } />

        <Route
          path="/about"
          element={
          <PageTransition>
              <About />
            </PageTransition>
          } />

        <Route
          path="/careers"
          element={
          <PageTransition>
              <Careers />
            </PageTransition>
          } />

        <Route
          path="/blog"
          element={
          <PageTransition>
              <Blog />
            </PageTransition>
          } />

        <Route
          path="/contact"
          element={
          <PageTransition>
              <Contact />
            </PageTransition>
          } />

        <Route
          path="/terms"
          element={
          <PageTransition>
              <Terms />
            </PageTransition>
          } />

        <Route
          path="/privacy"
          element={
          <PageTransition>
              <Privacy />
            </PageTransition>
          } />

        <Route
          path="/cookies"
          element={
          <PageTransition>
              <Cookies />
            </PageTransition>
          } />


        {/* Jobs (Public Read) */}
        <Route
          path="/jobs"
          element={
          <PageTransition>
              <Jobs />
            </PageTransition>
          } />

        <Route
          path="/jobs/:id"
          element={
          <PageTransition>
              <JobDetails />
            </PageTransition>
          } />


        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/profile/:userId"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/notifications"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Notifications />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Client Only */}
        <Route
          path="/jobs/create"
          element={
          <ProtectedRoute requiredRole="client">
              <PageTransition>
                <CreateJob />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/jobs/my"
          element={
          <ProtectedRoute requiredRole="client">
              <PageTransition>
                <MyJobs />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Freelancer Only */}
        <Route
          path="/jobs/applied"
          element={
          <ProtectedRoute requiredRole="freelancer">
              <PageTransition>
                <AppliedJobs />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/jobs/saved"
          element={
          <ProtectedRoute requiredRole="freelancer">
              <PageTransition>
                <SavedJobs />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Contracts (Both) */}
        <Route
          path="/contracts"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Contracts />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/contracts/:id"
          element={
          <ProtectedRoute>
              <PageTransition>
                <ContractDetails />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Chat (Both) */}
        <Route
          path="/chat"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Chat />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/chat/:threadId"
          element={
          <ProtectedRoute>
              <PageTransition>
                <ChatRoom />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Payments */}
        <Route
          path="/payments/checkout/:contractId"
          element={
          <ProtectedRoute requiredRole="client">
              <PageTransition>
                <Checkout />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/payments/result/:paymentId"
          element={
          <ProtectedRoute>
              <PageTransition>
                <Result />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* Admin */}
        <Route
          path="/admin"
          element={
          <ProtectedRoute requiredRole="admin">
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/admin/users"
          element={
          <ProtectedRoute requiredRole="admin">
              <PageTransition>
                <Users />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/admin/jobs"
          element={
          <ProtectedRoute requiredRole="admin">
              <PageTransition>
                <AdminJobs />
              </PageTransition>
            </ProtectedRoute>
          } />

        <Route
          path="/admin/proposals"
          element={
          <ProtectedRoute requiredRole="admin">
              <PageTransition>
                <AdminProposals />
              </PageTransition>
            </ProtectedRoute>
          } />


        {/* 404 */}
        <Route
          path="*"
          element={
          <PageTransition>
              <NotFound />
            </PageTransition>
          } />

      </Routes>
    </AnimatePresence>);

}
export function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <NotificationsProvider>
          <ChatProvider>
            <JobsProvider>
              <ProposalsProvider>
                <ContractsProvider>
                  <AppliedSavedProvider>
                    <PaymentsProvider>
                      <AnimatedRoutes />
                    </PaymentsProvider>
                  </AppliedSavedProvider>
                </ContractsProvider>
              </ProposalsProvider>
            </JobsProvider>
          </ChatProvider>
        </NotificationsProvider>
      </AuthProvider>
    </Router>);

}