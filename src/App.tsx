import { Route, Routes } from 'react-router-dom';

import Layout from './components/ui/Layout';
import ProtectedRoute from './components/ui/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

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
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all 404 (outside layout on purpose) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
