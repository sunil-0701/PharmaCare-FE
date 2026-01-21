import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { LandingPage } from './components/LandingPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { AdminDashboard } from './components/AdminDashboard.jsx';
import { POSInterface } from './components/POSInterface.jsx';
import { InventoryDashboard } from './components/InventoryDashboard.jsx';
import { SupplierManagement } from './components/SupplierManagement.jsx';
import { PrescriptionManagement } from './components/PrescriptionManagement.jsx';
import { ReportsAnalytics } from './components/ReportsAnalytics.jsx';
import { SettingsPage } from './components/SettingsPage.jsx';
import { StaffManagement } from './components/StaffManagement.jsx';
import './App.css';

function MainApp() {
  const { user, isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('landing');
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') setCurrentView('dashboard');
      if (user.role === 'pharmacist') setCurrentView('pos');
      if (user.role === 'inventory') setCurrentView('inventory');
    }
  }, [user]);

  if (!isAuthenticated) {
    return authView === 'login'
      ? <LoginPage onNavigateBack={() => setAuthView('landing')} />
      : <LandingPage onNavigateToLogin={() => setAuthView('login')} />;
  }

  const renderView = () => {
    if (user?.role === 'admin') {
      switch (currentView) {
        case 'dashboard': return <AdminDashboard />;
        case 'staff': return <StaffManagement />;
        case 'reports': return <ReportsAnalytics />;
        case 'settings': return <SettingsPage />;
        default: return <AdminDashboard />;
      }
    }

    if (user?.role === 'pharmacist') {
      switch (currentView) {
        case 'pos': return <POSInterface />;
        case 'prescriptions': return <PrescriptionManagement />;
        case 'reports': return <ReportsAnalytics />;
        default: return <POSInterface />;
      }
    }

    if (user?.role === 'inventory') {
      switch (currentView) {
        case 'inventory': return <InventoryDashboard />;
        case 'suppliers': return <SupplierManagement />;
        case 'reports': return <ReportsAnalytics />;
        default: return <InventoryDashboard />;
      }
    }

    return <div>Unknown role</div>;
  };

  return (
    <div className="app-layout">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="app-main">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
