import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import Sidebar from './components/Sidebar';

// Simple Unauthorized Page
const Unauthorized = () => <div className="p-10 text-center"><h1>403 - Unauthorized Access</h1></div>;

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/unauthorized" />;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">{children}</div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin" element={<ProtectedRoute allowedRole="Admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/doctor" element={<ProtectedRoute allowedRole="Doctor"><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/patient" element={<ProtectedRoute allowedRole="Patient"><PatientDashboard /></ProtectedRoute>} />
          <Route path="/receptionist" element={<ProtectedRoute allowedRole="Receptionist"><ReceptionistDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;