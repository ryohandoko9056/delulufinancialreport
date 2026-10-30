import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptText, 
  Camera, 
  CalendarHeart, 
  PiggyBank, 
  Music2, 
  Settings, 
  Sparkles
} from 'lucide-react';
import { useBudget } from '../hooks/useBudget';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ReceiptText, badgeKey: 'transactions' },
  { path: '/memories', label: 'Concert Memories', icon: Camera, badgeKey: 'concertMemories' },
  { path: '/upcoming', label: 'Upcoming Concerts', icon: CalendarHeart, badgeKey: 'upcomingConcerts' },
  { path: '/savings', label: 'Savings Goals', icon: PiggyBank, badgeKey: 'savingsGoals' },
  { path: '/groups', label: 'K-pop Groups', icon: Music2 },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const { profile, appData } = useBudget();

  const handleNavClick = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true" 
        />
      )}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo-area">
          <NavLink to="/" onClick={handleNavClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div className="app-brand-badge">
              🎀
            </div>
            <div className="app-title-group">
              <h1>Delulu Budget</h1>
              <span><Sparkles size={12} color="var(--primary)" /> K-pop Stan Finance</span>
            </div>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const count = item.badgeKey && Array.isArray(appData[item.badgeKey]) ? appData[item.badgeKey].length : null;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
                end={item.path === '/'}
              >
                <Icon />
                <span>{item.label}</span>
                {count !== null && count > 0 && (
                  <span className="nav-badge">{count}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/settings" onClick={handleNavClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="bias-pill-mini">
              <div className="bias-avatar-mini">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.nickname} 
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                ) : (
                  profile.bias ? profile.bias.charAt(0) : '♡'
                )}
              </div>
              <div className="bias-info-mini">
                <div className="bias-name-mini">
                  {profile.bias ? `${profile.bias} Stan` : profile.nickname || 'K-pop Bestie'}
                </div>
                <div className="bias-group-mini">
                  {profile.primaryGroupName || 'Multi-fan'} • Settings ⚙️
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
