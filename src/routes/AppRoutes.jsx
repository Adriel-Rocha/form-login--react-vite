import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/form-login--react-vite/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
