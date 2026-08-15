import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Fallback placeholder components until HR & Employee dashboard issues are built
const HRDashboardPlaceholder = () => (
  <div className="p-8 bg-slate-900 text-white min-h-screen">
    <h1 className="text-2xl font-bold">HR Dashboard Placeholder</h1>
  </div>
);

const EmployeeDashboardPlaceholder = () => (
  <div className="p-8 bg-slate-900 text-white min-h-screen">
    <h1 className="text-2xl font-bold">Employee Dashboard Placeholder</h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected HR Routes */}
          <Route element={<ProtectedRoute allowedRole="hr" />}>
            <Route path="/hr/dashboard" element={<HRDashboardPlaceholder />} />
          </Route>

          {/* Protected Employee Routes */}
          <Route element={<ProtectedRoute allowedRole="employee" />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboardPlaceholder />} />
          </Route>

          {/* Default Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;