import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected HR Routes */}
            <Route element={<ProtectedRoute allowedRole="hr" />}>
              <Route path="/hr/dashboard" element={<HRDashboard />} />
            </Route>

            {/* Protected Employee Routes */}
            <Route element={<ProtectedRoute allowedRole="employee" />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            </Route>

            {/* Default Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
