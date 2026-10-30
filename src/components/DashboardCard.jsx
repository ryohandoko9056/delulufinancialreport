import React from 'react';

export default function DashboardCard({
  icon,
  title,
  value,
  subtitle,
  badgeText,
  badgeType = 'default', // 'default', 'success', 'warning', 'danger'
  color = 'var(--primary)',
  bgColor = 'var(--primary-light)',
  onClick
}) {
  let badgeStyle = {
    background: 'var(--primary-light)',
    color: 'var(--primary-hover)'
  };

  if (badgeType === 'success') {
    badgeStyle = { background: '#ECFDF5', color: '#065F46' };
  } else if (badgeType === 'warning') {
    badgeStyle = { background: '#FFFBEB', color: '#B45309' };
  } else if (badgeType === 'danger') {
    badgeStyle = { background: '#FEF2F2', color: '#B91C1C' };
  }

  return (
    <div 
      className="delulu-card dashboard-stat-card" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', padding: '20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div 
          style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            background: bgColor,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
          }}
        >
          {icon}
        </div>
        {badgeText && (
          <span 
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              ...badgeStyle
            }}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
        {title}
      </div>

      <div style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
