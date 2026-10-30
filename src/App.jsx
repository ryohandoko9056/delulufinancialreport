import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import ConcertMemories from './pages/ConcertMemories';
import UpcomingConcerts from './pages/UpcomingConcerts';
import SavingsGoals from './pages/SavingsGoals';
import KpopGroups from './pages/KpopGroups';
import Settings from './pages/Settings';

function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar Navigation with clickable Link / NavLink */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar onToggleMobileMenu={() => setIsMobileOpen((p) => !p)} />

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/memories" element={<ConcertMemories />} />
            <Route path="/upcoming" element={<UpcomingConcerts />} />
            <Route path="/savings" element={<SavingsGoals />} />
            <Route path="/groups" element={<KpopGroups />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BudgetProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </BudgetProvider>
  );
}
