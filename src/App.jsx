import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Pharmacy from './pages/Pharmacy';
import Billing from './pages/Billing';
import Doctors from './pages/Doctors';
import LandingPage from './pages/LandingPage';
import Laboratory from './pages/Laboratory';
import Inpatient from './pages/Inpatient';
import Reports from './pages/Reports';
import LiveChat from './pages/LiveChat';
import QueueSystem from './pages/QueueSystem';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Note: all dashboard components are now under /app */}
        <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="live-chat" element={<LiveChat />} />
          <Route path="queue" element={<QueueSystem />} />
          <Route path="patients" element={<Patients />} />
          <Route path="inpatient" element={<Inpatient />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Fallback to handle old paths if they were bookmarked directly (optional, but good UX) */}
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
