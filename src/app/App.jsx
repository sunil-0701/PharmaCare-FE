import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { PrescriptionProvider } from './contexts/PrescriptionContext.jsx';
import { InventoryProvider } from './contexts/InventoryContext.jsx';
import { SalesProvider } from './contexts/SalesContext.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { AdminDashboard } from './components/AdminDashboard.jsx';
import { POSInterface } from './components/POSInterface.jsx';
import { InventoryDashboard } from './components/InventoryDashboard.jsx';
import { SupplierManagement } from './components/SupplierManagement.jsx';
import { PrescriptionManagement } from './components/PrescriptionManagement.jsx';
import { AddPrescription } from './components/AddPrescription.jsx';
import { AddBatch } from './components/AddBatch.jsx';
import { ReportsAnalytics } from './components/ReportsAnalytics.jsx';
import { SettingsPage } from './components/SettingsPage.jsx';
import { StaffManagement } from './components/StaffManagement.jsx';
import './App.css';

function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentView = () => {
    const path = location.pathname.substring(1);
    if (path === 'admin') return 'dashboard';
    return path;
  };

  const handleViewChange = (viewId) => {
    if (viewId === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/${viewId}`);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        currentView={getCurrentView()}
        onViewChange={handleViewChange}
      />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'pharmacist') return <Navigate to="/pos" replace />;
    if (user.role === 'inventory') return <Navigate to="/inventory" replace />;
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

function MainApp() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login')) {
      if (user?.role === 'admin') navigate('/admin');
      else if (user?.role === 'pharmacist') navigate('/pos');
      else if (user?.role === 'inventory') navigate('/inventory');
    }
  }, [isAuthenticated, user, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage onNavigateToLogin={() => navigate('/login')} />} />
      <Route path="/login" element={<LoginPage onNavigateBack={() => navigate('/')} />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>


          <Route element={<ProtectedRoute allowedRoles={['pharmacist']} />}>
            <Route path="/pos" element={<POSInterface />} />
            <Route path="/prescriptions" element={<PrescriptionManagement />} />
            <Route path="/prescriptions/add" element={<AddPrescription />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['inventory']} />}>
            <Route path="/inventory" element={<InventoryDashboard />} />
            <Route path="/inventory/add-batch" element={<AddBatch />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
          </Route>

          <Route path="/reports" element={<ReportsAnalytics />} />

        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PrescriptionProvider>
        <InventoryProvider>
          <SalesProvider>
            <MainApp />
          </SalesProvider>
        </InventoryProvider>
      </PrescriptionProvider>
    </AuthProvider>
  );
}
