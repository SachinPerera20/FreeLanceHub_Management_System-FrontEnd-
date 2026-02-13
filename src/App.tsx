
import { Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ui/ProtectedRoute';


export default function App() {
  return (
    <Routes>
       <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/profile"  element={  <ProtectedRoute> <Profile /> </ProtectedRoute> }/>
      
      </Route>
    </Routes>
  );
}

