import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBudget } from '../hooks/useBudget';
import { calculateMonthlyStats, calculateUpcomingEstimatedTotal } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { formatDisplayDate, calculateCountdown } from '../utils/dateHelpers';
import DashboardCard from '../components/DashboardCard';
import BudgetProgress from '../components/BudgetProgress';
import TransactionList from '../components/TransactionList';
import Modal from '../components/Modal';
import TransactionForm from '../components/TransactionForm';
import { 
  DollarSign, 
  Wallet, 
  Receipt, 
  CalendarHeart, 
  PiggyBank, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  ArrowRight,
  PieChart as PieIcon,
  BarChart3 as BarIcon,
  ListOrdered
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    profile,
    monthlyBudgets,
    transactions,
    upcomingConcerts,
    savingsGoals,
    selectedMonth,
    setMonthlyBudget,
    addTransaction
  } = useBudget();

  const [chartType, setChartType] = useState('pie'); // 'pie', 'bar', 'summary'
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetValueInput, setBudgetValueInput] = useState('');

  const currentMonthBudget = monthlyBudgets[selectedMonth] !== undefined 
    ? monthlyBudgets[selectedMonth] 
    : profile.monthlyBudget || 0;

  const monthlyStats = useMemo(() => {
    return calculateMonthlyStats(currentMonthBudget, transactions, selectedMonth, profile.currency);
  }, [currentMonthBudget, transactions, selectedMonth, profile.currency]);

  // Total saved towards concert goals
  const totalSavedTowardsGoals = useMemo(() => {
    return savingsGoals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0);
  }, [savingsGoals]);

  // Total estimated cost of upcoming concerts
  const totalEstimatedUpcoming = useMemo(() => {
    return upcomingConcerts.reduce((sum, c) => sum + calculateUpcomingEstimatedTotal(c), 0);
  }, [upcomingConcerts]);

  // Nearest upcoming concert
  const nearestUpcomingConcert = useMemo(() => {
    if (!upcomingConcerts || upcomingConcerts.length === 0) return null;
    const sorted = [...upcomingConcerts].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    return sorted[0];
  }, [upcomingConcerts]);

  const nearestConcertCountdown = nearestUpcomingConcert ? calculateCountdown(nearestUpcomingConcert.date) : null;
  const nearestLinkedGoal = nearestUpcomingConcert?.linkedGoalId 
    ? savingsGoals.find(g => g.id === nearestUpcomingConcert.linkedGoalId)
    : null;

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const amount = Number(budgetValueInput);
    if (!isNaN(amount) && amount >= 0) {
      setMonthlyBudget(selectedMonth, amount);
      setIsBudgetModalOpen(false);
    }
  };

  const handleAddTx = (txData) => {
    addTransaction(txData);
    setIsAddTxModalOpen(false);
  };

  return (
    <div className="dashboard-page">
      {/* Personalized Greeting Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Welcome back, {profile.nickname || 'Bestie'}! ♡
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '2px' }}>
            {profile.bias && profile.primaryGroupName ? (
              <span>Your bias <strong>{profile.bias}</strong> ({profile.primaryGroupName}) is counting on you to stay financially responsible! 🎀</span>
            ) : (
              <span>Ready to manage your money, buy merch, and plan your next barricade era? ✨</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setBudgetValueInput(String(currentMonthBudget));
              setIsBudgetModalOpen(true);
            }}
          >
            💰 Set Budget
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsAddTxModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Dynamic Delulu Status Banner */}
      <div 
        className="delulu-status-banner"
        style={{
          background: monthlyStats.deluluStatus.bgColor,
          borderColor: monthlyStats.deluluStatus.borderColor,
          color: monthlyStats.deluluStatus.color
        }}
      >
        <div className="delulu-status-content">
          <div className="delulu-status-emoji">
            {monthlyStats.deluluStatus.emoji}
          </div>
          <div>
            <span className="delulu-status-badge">
              {monthlyStats.deluluStatus.badge}
            </span>
            <h2 className="delulu-status-title">
              {monthlyStats.deluluStatus.title}
            </h2>
            <p className="delulu-status-desc">
              {monthlyStats.deluluStatus.message}
            </p>
          </div>
        </div>

        {monthlyStats.deluluStatus.level === 'no_budget' && (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => {
              setBudgetValueInput(String(currentMonthBudget));
              setIsBudgetModalOpen(true);
            }}
          >
            Set Budget Now
          </button>
        )}
      </div>

      {/* Financial Summary Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <DashboardCard
          icon={<Wallet size={20} />}
          title="Monthly Budget"
          value={formatCurrency(currentMonthBudget, profile.currency)}
          subtitle={<span>For {selectedMonth}</span>}
          badgeText={currentMonthBudget > 0 ? 'Active' : 'Unset'}
          badgeType={currentMonthBudget > 0 ? 'default' : 'warning'}
        />

        <DashboardCard
          icon={<DollarSign size={20} />}
          title="Total Expenses"
          value={formatCurrency(monthlyStats.totalExpenses, profile.currency)}
          subtitle={<span>{monthlyStats.usagePercentage}% of budget spent</span>}
          badgeText={`${monthlyStats.transactionCount} transactions`}
          badgeType={monthlyStats.usagePercentage >= 100 ? 'danger' : monthlyStats.usagePercentage >= 80 ? 'warning' : 'success'}
          color="var(--primary-hover)"
        />

        <DashboardCard
          icon={<TrendingUp size={20} />}
          title="Remaining Balance"
          value={formatCurrency(monthlyStats.remainingBudget, profile.currency)}
          subtitle={monthlyStats.remainingBudget < 0 ? 'Overspent amount!' : 'Available to spend'}
          badgeText={monthlyStats.remainingBudget < 0 ? 'Overbudget' : 'On Track'}
          badgeType={monthlyStats.remainingBudget < 0 ? 'danger' : 'success'}
          color={monthlyStats.remainingBudget < 0 ? '#EF4444' : '#10B981'}
        />

        <DashboardCard
          icon={<CalendarHeart size={20} />}
          title="Planned Concerts"
          value={upcomingConcerts.length}
          subtitle={`Est: ${formatCurrency(totalEstimatedUpcoming, profile.currency)}`}
          badgeText="Next Era"
          onClick={() => navigate('/upcoming')}
        />

        <DashboardCard
          icon={<PiggyBank size={20} />}
          title="Saved for Concerts"
          value={formatCurrency(totalSavedTowardsGoals, profile.currency)}
          subtitle={`${savingsGoals.length} active goals`}
          badgeText="Goals"
          badgeType="success"
          onClick={() => navigate('/savings')}
          color="#10B981"
          bgColor="#ECFDF5"
        />
      </div>

      {/* Budget Progress Bar */}
      <BudgetProgress
        budget={currentMonthBudget}
        expenses={monthlyStats.totalExpenses}
        currencyCode={profile.currency}
        onEditBudget={() => {
          setBudgetValueInput(String(currentMonthBudget));
          setIsBudgetModalOpen(true);
        }}
      />

      {/* Two Column Layout: Charts & Nearest Concert */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        marginBottom: '28px'
      }}>
        {/* Spending Breakdown Chart Card */}
        <div className="delulu-card">
          <div className="delulu-card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <PieIcon size={18} />
              </div>
              <div>
                <h3 className="delulu-card-title">Spending Breakdown</h3>
                <div className="delulu-card-subtitle">Expenses by K-pop category</div>
              </div>
            </div>

            {/* Chart Switcher Buttons */}
            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  background: chartType === 'pie' ? 'var(--bg-card)' : 'transparent',
                  color: chartType === 'pie' ? 'var(--primary-hover)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px'
                }}
                onClick={() => setChartType('pie')}
                title="Doughnut Chart"
              >
                <PieIcon size={13} />
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  background: chartType === 'bar' ? 'var(--bg-card)' : 'transparent',
                  color: chartType === 'bar' ? 'var(--primary-hover)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px'
                }}
                onClick={() => setChartType('bar')}
                title="Bar Chart"
              >
                <BarIcon size={13} />
              </button>
              <button
                type="button"
                className="btn btn-sm"
                style={{
                  background: chartType === 'summary' ? 'var(--bg-card)' : 'transparent',
                  color: chartType === 'summary' ? 'var(--primary-hover)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px'
                }}
                onClick={() => setChartType('summary')}
                title="Summary List"
              >
                <ListOrdered size={13} />
              </button>
            </div>
          </div>

          {monthlyStats.categoryBreakdown.length === 0 ? (
            <div className="empty-state" style={{ padding: '36px 10px' }}>
              <div className="empty-state-emoji">💿</div>
              <div className="empty-state-title">No spending data this month</div>
              <div className="empty-state-desc">
                Record an album, photocard, or merch purchase to visualize your spending habits!
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setIsAddTxModalOpen(true)}
              >
                <Plus size={14} /> Add First Purchase
              </button>
            </div>
          ) : (
            <div>
              {chartType === 'pie' && (
                <div style={{ width: '100%', height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={monthlyStats.categoryBreakdown}
                        dataKey="total"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                      >
                        {monthlyStats.categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || 'var(--primary)'} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val) => formatCurrency(val, profile.currency)}
                        contentStyle={{
                          background: 'white',
                          borderRadius: '12px',
                          border: '1.5px solid var(--border-color)',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                          fontSize: '0.85rem'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {chartType === 'bar' && (
                <div style={{ width: '100%', height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyStats.categoryBreakdown}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis type="number" tickFormatter={(v) => formatCurrency(v, profile.currency)} />
                      <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(val) => formatCurrency(val, profile.currency)} />
                      <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                        {monthlyStats.categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-bar-${index}`} fill={entry.color || 'var(--primary)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Category Breakdown legend / list */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px',
                marginTop: '12px',
                maxHeight: '130px',
                overflowY: 'auto'
              }}>
                {monthlyStats.categoryBreakdown.map((cat) => (
                  <div
                    key={cat.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--bg-main)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: cat.color }} />
                      <span style={{ fontWeight: 700 }}>{cat.emoji} {cat.name}</span>
                    </div>
                    <span style={{ fontWeight: 800 }}>{formatCurrency(cat.total, profile.currency)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Nearest Upcoming Concert Card */}
        <div className="delulu-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="delulu-card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <CalendarHeart size={18} />
                </div>
                <div>
                  <h3 className="delulu-card-title">Next Concert Tour</h3>
                  <div className="delulu-card-subtitle">Your nearest upcoming K-pop event</div>
                </div>
              </div>

              <Link
                to="/upcoming"
                className="btn btn-outline btn-sm"
              >
                Planner <ArrowRight size={13} />
              </Link>
            </div>

            {nearestUpcomingConcert ? (
              <div>
                <div style={{
                  background: nearestConcertCountdown.isToday ? 'linear-gradient(135deg, #FF7597, #FF8DA7)' : 'var(--primary-light)',
                  color: nearestConcertCountdown.isToday ? 'white' : 'var(--primary-hover)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} />
                    <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>
                      {nearestConcertCountdown.isToday 
                        ? 'CONCERT IS TODAY! 🎉'
                        : nearestConcertCountdown.isPast 
                        ? 'Passed event'
                        : `${nearestConcertCountdown.days} days until you see your bias!`}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    background: 'white',
                    color: 'var(--primary-hover)'
                  }}>
                    {nearestUpcomingConcert.ticketStatus || 'Planned'}
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.2 }}>
                    {nearestUpcomingConcert.concertName}
                  </h4>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary-hover)', marginTop: '2px' }}>
                    {nearestUpcomingConcert.groupName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    📅 {formatDisplayDate(nearestUpcomingConcert.date)} • 📍 {nearestUpcomingConcert.venue}, {nearestUpcomingConcert.city}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-main)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Est. Expenses</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {formatCurrency(calculateUpcomingEstimatedTotal(nearestUpcomingConcert), profile.currency)}
                    </div>
                  </div>
                  {nearestLinkedGoal && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Savings Goal Progress</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#10B981' }}>
                        {formatCurrency(nearestLinkedGoal.currentAmount, profile.currency)} ({Math.min(100, Math.round((nearestLinkedGoal.currentAmount / (nearestLinkedGoal.targetAmount || 1)) * 100))}%)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '36px 10px' }}>
                <div className="empty-state-emoji">🎟️</div>
                <div className="empty-state-title">No upcoming concerts scheduled</div>
                <div className="empty-state-desc">
                  Is your favorite group touring soon? Add their tour date to prepare your budget!
                </div>
                <Link
                  to="/upcoming"
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Plan an Upcoming Concert
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="delulu-card">
        <div className="delulu-card-header">
          <div className="card-title-group">
            <div className="card-icon-badge">
              <Receipt size={18} />
            </div>
            <div>
              <h3 className="delulu-card-title">Recent Transactions</h3>
              <div className="delulu-card-subtitle">Latest recorded fan spending</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to="/transactions"
              className="btn btn-outline btn-sm"
            >
              <span>View All Transactions</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <TransactionList
          transactions={transactions}
          currencyCode={profile.currency}
          limit={5}
        />
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddTxModalOpen}
        onClose={() => setIsAddTxModalOpen(false)}
        title="🎀 Record K-pop Expense"
      >
        <TransactionForm
          onSubmit={handleAddTx}
          onCancel={() => setIsAddTxModalOpen(false)}
          submitLabel="Save Transaction"
        />
      </Modal>

      {/* Configure Monthly Budget Modal */}
      <Modal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        title={`💰 Set Budget for ${selectedMonth}`}
        maxWidth="440px"
      >
        <form onSubmit={handleSaveBudget}>
          <div className="form-group">
            <label className="form-label">
              <span>Monthly Spending Target ({profile.currency || 'TWD'})</span>
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 15000"
              min="0"
              step="any"
              value={budgetValueInput}
              onChange={(e) => setBudgetValueInput(e.target.value)}
              required
              autoFocus
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              We'll calculate your Delulu status and warn you when you pass 50%, 80%, and 100%!
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsBudgetModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Budget
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
