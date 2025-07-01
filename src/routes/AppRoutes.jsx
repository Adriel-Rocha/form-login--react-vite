import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import PrivateRoute from '../components/privateRoutes';

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                      } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}
