import React from 'react';
import { formatCurrency } from '../utils/currency';
import { AlertTriangle, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';

export default function BudgetProgress({
  budget = 0,
  expenses = 0,
  currencyCode = 'TWD',
  onEditBudget
}) {
  const hasBudget = budget > 0;
  const usagePercentage = hasBudget ? (expenses / budget) * 100 : (expenses > 0 ? 100 : 0);
  const remaining = budget - expenses;
  const isOverbudget = expenses > budget && hasBudget;
  const overspentAmount = isOverbudget ? expenses - budget : 0;

  // Determine color and status message
  let barColor = 'var(--primary)';
  let statusBadge = 'Safe & Slaying';
  let badgeClass = 'status-safe';
  let statusIcon = <Sparkles size={14} />;

  if (!hasBudget) {
    barColor = '#9CA3AF';
    statusBadge = 'No Budget Set';
    badgeClass = 'status-neutral';
    statusIcon = <AlertTriangle size={14} />;
  } else if (usagePercentage >= 100) {
    barColor = '#EF4444'; // Red
    statusBadge = 'Budget Exceeded!';
    badgeClass = 'status-bankruptcy';
    statusIcon = <AlertTriangle size={14} />;
  } else if (usagePercentage >= 80) {
    barColor = '#F59E0B'; // Amber
    statusBadge = 'High Spending Warning';
    badgeClass = 'status-danger';
    statusIcon = <AlertTriangle size={14} />;
  } else if (usagePercentage >= 50) {
    barColor = '#3B82F6'; // Blue
    statusBadge = 'Requires Attention';
    badgeClass = 'status-caution';
    statusIcon = <TrendingUp size={14} />;
  } else {
    barColor = '#10B981'; // Green
    statusBadge = 'Comfortable Spending';
    badgeClass = 'status-safe';
    statusIcon = <CheckCircle size={14} />;
  }

  // Cap the visual bar width at 100% so it doesn't overflow container
  const visualFillPercentage = Math.min(100, Math.max(0, usagePercentage));

  return (
    <div className="delulu-card budget-progress-card" style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Monthly Spending Tracker
            </h3>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '3px 9px',
              borderRadius: 'var(--radius-full)',
              background: usagePercentage >= 100 ? '#FEE2E2' : usagePercentage >= 80 ? '#FEF3C7' : '#ECFDF5',
              color: usagePercentage >= 100 ? '#DC2626' : usagePercentage >= 80 ? '#D97706' : '#059669'
            }}>
              {statusIcon} {statusBadge}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {hasBudget 
              ? `${Math.round(usagePercentage)}% of monthly budget utilized` 
              : 'Set a budget to activate delulu warning thresholds!'}
          </div>
        </div>

        {onEditBudget && (
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={onEditBudget}
          >
            ✏️ {hasBudget ? 'Edit Monthly Budget' : 'Configure Budget'}
          </button>
        )}
      </div>

      {/* Visual Progress Bar */}
      <div className="progress-container" style={{ height: '16px', background: 'var(--border-light)', marginBottom: '14px' }}>
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${visualFillPercentage}%`, 
            backgroundColor: barColor 
          }} 
        />
      </div>

      {/* Financial Details Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
        <div style={{ background: 'var(--bg-main)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Monthly Budget</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {hasBudget ? formatCurrency(budget, currencyCode) : 'Not set'}
          </div>
        </div>

        <div style={{ background: 'var(--bg-main)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Spent This Month</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-hover)' }}>
            {formatCurrency(expenses, currencyCode)}
          </div>
        </div>

        <div style={{ background: 'var(--bg-main)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            {isOverbudget ? 'Overspent by' : 'Remaining Budget'}
          </div>
          <div style={{ 
            fontSize: '1.15rem', 
            fontWeight: 800, 
            color: isOverbudget ? '#EF4444' : '#10B981' 
          }}>
            {isOverbudget 
              ? `- ${formatCurrency(overspentAmount, currencyCode)}` 
              : formatCurrency(remaining, currencyCode)}
          </div>
        </div>
      </div>
    </div>
  );
}
