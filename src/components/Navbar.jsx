import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Calendar, Palette, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { useBudget, THEMES } from '../context/BudgetContext';

export default function Navbar({ onToggleMobileMenu }) {
  const { profile, selectedMonth, setSelectedMonth, setTheme } = useBudget();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef(null);

  // Close theme popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEMES.find((t) => t.id === profile.theme) || THEMES[0];

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <Link to="/settings" className="user-welcome-chip" style={{ textDecoration: 'none' }} title="Edit Profile & Settings">
          <Heart size={15} fill="var(--primary)" color="var(--primary)" />
          <span>
            Hi, <strong>{profile.nickname || 'Bestie'}</strong>!
          </span>
          {profile.primaryGroupName && (
            <span style={{ opacity: 0.8, fontSize: '0.8rem', marginLeft: '2px' }}>
              • {profile.primaryGroupName} {profile.bias && `(${profile.bias})`}
            </span>
          )}
        </Link>
      </div>

      <div className="navbar-right">
        {/* Month Picker */}
        <div className="month-selector-pill" title="Filter finance data by month">
          <Calendar size={16} color="var(--primary)" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => {
              if (e.target.value) {
                setSelectedMonth(e.target.value);
              }
            }}
            aria-label="Select active month"
          />
        </div>

        {/* Theme Selector Popover */}
        <div className="theme-dropdown" ref={themeRef}>
          <button
            type="button"
            className="theme-trigger-btn"
            onClick={() => setIsThemeOpen((prev) => !prev)}
            aria-label="Change color theme"
          >
            <div
              className="theme-color-dot"
              style={{ backgroundColor: currentThemeObj.primary }}
            />
            <span>{currentThemeObj.name}</span>
            <ChevronDown size={14} />
          </button>

          {isThemeOpen && (
            <div className="theme-popover">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-option-btn ${profile.theme === theme.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsThemeOpen(false);
                  }}
                >
                  <div
                    className="theme-color-dot"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
