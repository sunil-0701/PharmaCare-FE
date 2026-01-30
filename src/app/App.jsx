import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Pill } from 'lucide-react';
import { Toaster } from 'sonner';
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
function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  // If on landing or login page, just render the outlet without the sidebar/layout structure
  if (isLandingPage || isLoginPage) {
    return <Outlet />;
  }

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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden font-sans relative">
      <Sidebar
        currentView={getCurrentView()}
        onViewChange={(viewId) => {
          handleViewChange(viewId);
          setIsMobileSidebarOpen(false);
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Pill size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">PharmaCare</h1>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
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
            <Toaster position="top-right" richColors />
            <MainApp />
          </SalesProvider>
        </InventoryProvider>
      </PrescriptionProvider>
    </AuthProvider>
  );
}
