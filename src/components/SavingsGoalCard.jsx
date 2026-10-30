import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { calculateSavingsProgress } from '../utils/calculations';
import { formatDisplayDate } from '../utils/dateHelpers';
import { Sparkles, PlusCircle, Edit3, Trash2, CheckCircle2, Calendar, Music2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Modal from './Modal';

export default function SavingsGoalCard({
  goal,
  currencyCode = 'TWD',
  onEdit,
  onDelete,
  onAddContribution
}) {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { current, target, remaining, percentage, isCompleted, message } = calculateSavingsProgress(
    goal.currentAmount,
    goal.targetAmount
  );

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amount = Number(depositAmount);
    if (isNaN(amount) || amount <= 0) return;

    onAddContribution(goal.id, amount);

    // If this contribution completes or exceeds the goal, trigger celebratory confetti!
    if (current + amount >= target && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF7597', '#A29BFE', '#FAB1A0', '#FFE4EC', '#FDCB6E']
      });
    }

    setDepositAmount('');
    setIsDepositModalOpen(false);
  };

  return (
    <div
      className="delulu-card savings-goal-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: isCompleted ? '2px solid #10B981' : '1.5px solid var(--border-color)',
        position: 'relative'
      }}
    >
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main)' }}>
                {goal.name}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              {goal.groupName && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 700, color: 'var(--primary-hover)' }}>
                  <Music2 size={12} /> {goal.groupName}
                </span>
              )}
              {goal.targetDate && (
                <>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Calendar size={12} /> Target: {formatDisplayDate(goal.targetDate)}
                  </span>
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              className="btn btn-outline btn-icon"
              style={{ width: '30px', height: '30px' }}
              onClick={() => onEdit(goal)}
              title="Edit goal"
            >
              <Edit3 size={13} />
            </button>
            <button
              type="button"
              className="btn btn-danger btn-icon"
              style={{ width: '30px', height: '30px' }}
              onClick={() => setIsDeleteModalOpen(true)}
              title="Delete goal"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Motivational Quote / Status */}
        <div style={{
          background: isCompleted ? '#ECFDF5' : 'var(--primary-ultralight)',
          border: isCompleted ? '1px solid #A7F3D0' : '1px solid var(--border-light)',
          color: isCompleted ? '#065F46' : 'var(--primary-hover)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.82rem',
          fontWeight: 700,
          margin: '12px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {isCompleted ? <CheckCircle2 size={16} color="#10B981" /> : <Sparkles size={16} />}
          <span>{message}</span>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-main)' }}>{percentage}% Saved</span>
            <span style={{ color: isCompleted ? '#10B981' : 'var(--text-muted)' }}>
              {isCompleted ? 'Target Achieved! 🏆' : `${formatCurrency(remaining, currencyCode)} remaining`}
            </span>
          </div>

          <div className="progress-container" style={{ height: '14px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: isCompleted ? '#10B981' : 'var(--primary)'
              }}
            />
          </div>
        </div>

        {/* Amount Figures */}
        <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-main)', padding: '10px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Current Savings</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-main)' }}>
              {formatCurrency(current, currencyCode)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Target Amount</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-muted)' }}>
              {formatCurrency(target, currencyCode)}
            </div>
          </div>
        </div>

        {goal.notes && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '12px' }}>
            "{goal.notes}"
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%', padding: '8px' }}
          onClick={() => setIsDepositModalOpen(true)}
        >
          <PlusCircle size={16} />
          <span>Add Savings Contribution</span>
        </button>
      </div>

      {/* Deposit Modal */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title={`Add Savings to "${goal.name}"`}
        maxWidth="450px"
      >
        <form onSubmit={handleDepositSubmit}>
          <div className="form-group">
            <label className="form-label">
              <span>Contribution Amount ({currencyCode})</span>
            </label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 1000"
              min="1"
              step="any"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
              autoFocus
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Tip: Savings contributions track money you have set aside for this goal separately from expenses.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsDepositModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Contribution
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Savings Goal?"
        maxWidth="420px"
        footer={(
          <>
            <button type="button" className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>
              Keep Goal
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onDelete(goal.id);
                setIsDeleteModalOpen(false);
              }}
            >
              Yes, Delete
            </button>
          </>
        )}
      >
        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
          Are you sure you want to delete <strong>{goal.name}</strong>? Any linked upcoming concerts will simply be unlinked.
        </p>
      </Modal>
    </div>
  );
}
