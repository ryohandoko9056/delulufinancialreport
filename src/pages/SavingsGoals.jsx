import React, { useState, useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { formatCurrency } from '../utils/currency';
import { getTodayDateString } from '../utils/dateHelpers';
import SavingsGoalCard from '../components/SavingsGoalCard';
import Modal from '../components/Modal';
import GroupSelector from '../components/GroupSelector';
import DashboardCard from '../components/DashboardCard';
import { 
  PiggyBank, 
  Plus, 
  Sparkles, 
  Trophy, 
  Target, 
  Music2, 
  Calendar 
} from 'lucide-react';

export default function SavingsGoals() {
  const {
    savingsGoals,
    profile,
    addSavingsGoal,
    updateSavingsGoal,
    addSavingsContribution,
    deleteSavingsGoal
  } = useBudget();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  // Form fields
  const [name, setName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupPicker, setShowGroupPicker] = useState(false);
  const [concertName, setConcertName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('0');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Summary statistics
  const totalSaved = useMemo(() => {
    return savingsGoals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0);
  }, [savingsGoals]);

  const totalTarget = useMemo(() => {
    return savingsGoals.reduce((sum, g) => sum + (Number(g.targetAmount) || 0), 0);
  }, [savingsGoals]);

  const completedCount = useMemo(() => {
    return savingsGoals.filter(g => (Number(g.currentAmount) || 0) >= (Number(g.targetAmount) || 0) && Number(g.targetAmount) > 0).length;
  }, [savingsGoals]);

  const overallProgressPercentage = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  const openAddModal = () => {
    setEditingGoal(null);
    setName('');
    setSelectedGroup(null);
    setShowGroupPicker(false);
    setConcertName('');
    setTargetAmount('');
    setCurrentAmount('0');
    setTargetDate('');
    setNotes('');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setName(goal.name || '');
    setSelectedGroup({ id: goal.groupId, name: goal.groupName });
    setShowGroupPicker(false);
    setConcertName(goal.concertName || '');
    setTargetAmount(goal.targetAmount !== undefined ? String(goal.targetAmount) : '');
    setCurrentAmount(goal.currentAmount !== undefined ? String(goal.currentAmount) : '0');
    setTargetDate(goal.targetDate || '');
    setNotes(goal.notes || '');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter a goal name (e.g. VIP Soundcheck fund, Lightstick fund)');
      return;
    }

    const numTarget = Number(targetAmount);
    if (isNaN(numTarget) || numTarget <= 0) {
      setFormError('Target amount must be a positive number greater than 0.');
      return;
    }

    const payload = {
      name: name.trim(),
      groupId: selectedGroup?.id || null,
      groupName: selectedGroup?.name || null,
      concertName: concertName.trim() || null,
      targetAmount: numTarget,
      currentAmount: Math.max(0, Number(currentAmount) || 0),
      targetDate: targetDate || null,
      notes: notes.trim()
    };

    if (editingGoal) {
      updateSavingsGoal(editingGoal.id, payload);
    } else {
      addSavingsGoal(payload);
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="savings-goals-page">
      {/* Header */}
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
              Concert Savings Goals
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-hover)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {savingsGoals.length} Goals
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            Save up for barricade tickets, lightsticks, travel hotels, and tour merch without going into debt! 💖
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddModal}
        >
          <Plus size={16} />
          <span>New Savings Goal</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <DashboardCard
          icon={<PiggyBank size={20} />}
          title="Total Money Saved"
          value={formatCurrency(totalSaved, profile.currency)}
          subtitle={<span>{overallProgressPercentage}% of total target</span>}
          badgeText="In the Piggy"
          badgeType="success"
          color="#10B981"
          bgColor="#ECFDF5"
        />

        <DashboardCard
          icon={<Target size={20} />}
          title="Total Target Amount"
          value={formatCurrency(totalTarget, profile.currency)}
          subtitle={<span>Across {savingsGoals.length} goals</span>}
          badgeText="Dream Target"
        />

        <DashboardCard
          icon={<Trophy size={20} />}
          title="Completed Goals"
          value={completedCount}
          subtitle={completedCount > 0 ? "Concert era unlocked! 🎉" : "Keep building your funds!"}
          badgeText={completedCount > 0 ? 'Unlocked!' : 'In Progress'}
          badgeType={completedCount > 0 ? 'success' : 'default'}
          color="#8B5CF6"
          bgColor="#F5F3FF"
        />
      </div>

      {/* Goals Grid */}
      {savingsGoals.length === 0 ? (
        <div className="empty-state delulu-card">
          <div className="empty-state-emoji">🐷</div>
          <div className="empty-state-title">No savings goals created yet</div>
          <div className="empty-state-desc">
            Whether it's a concert VIP ticket, round-trip flight, or official lightstick, set a savings goal and track your progress!
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openAddModal}
          >
            <Plus size={16} /> Create Your First Goal
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {savingsGoals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              goal={goal}
              currencyCode={profile.currency}
              onEdit={openEditModal}
              onDelete={deleteSavingsGoal}
              onAddContribution={addSavingsContribution}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Goal Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingGoal ? '✏️ Edit Savings Goal' : '🐷 New Concert Savings Goal'}
        maxWidth="540px"
      >
        <form onSubmit={handleFormSubmit}>
          {formError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '14px', fontWeight: 700 }}>
              {formError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Goal Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. NewJeans World Tour VIP Floor Barricade"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Group Selector */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                <Music2 size={15} color="var(--primary)" />
                <span>Associated K-pop Group (Optional)</span>
              </label>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                onClick={() => setShowGroupPicker((p) => !p)}
              >
                {showGroupPicker ? 'Close Selector' : selectedGroup ? 'Change Artist' : 'Select Artist'}
              </button>
            </div>

            {selectedGroup && !showGroupPicker && (
              <div style={{ background: 'var(--primary-light)', padding: '8px 12px', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '0.88rem' }}>
                ✨ {selectedGroup.name}
              </div>
            )}

            {showGroupPicker && (
              <div style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', marginTop: '6px' }}>
                <GroupSelector
                  selectedGroupId={selectedGroup?.id}
                  onSelectGroup={(grp) => {
                    setSelectedGroup(grp);
                    setShowGroupPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Target Amount ({profile.currency || 'TWD'}) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 15000"
                min="1"
                step="any"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Savings ({profile.currency || 'TWD'})</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                step="any"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Target Date (Optional)</label>
            <input
              type="date"
              className="form-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. Need to save for soundcheck ticket and official lightstick!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>{editingGoal ? 'Update Goal' : 'Create Goal'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
