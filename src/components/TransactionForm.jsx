import React, { useState, useEffect } from 'react';
import { EXPENSE_CATEGORIES } from '../data/categories';
import { getTodayDateString } from '../utils/dateHelpers';
import { useBudget } from '../hooks/useBudget';
import { Sparkles, Music2, CalendarHeart, AlertCircle } from 'lucide-react';
import GroupSelector from './GroupSelector';

export default function TransactionForm({
  initialData = null,
  onSubmit,
  onCancel,
  submitLabel = 'Record Expense'
}) {
  const { upcomingConcerts, profile, customGroups } = useBudget();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const [category, setCategory] = useState('albums');
  const [selectedGroupId, setSelectedGroupId] = useState(profile.primaryGroupId || '');
  const [selectedGroupName, setSelectedGroupName] = useState(profile.primaryGroupName || '');
  const [concertId, setConcertId] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [showGroupPicker, setShowGroupPicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setAmount(initialData.amount !== undefined ? String(initialData.amount) : '');
      setDate(initialData.date || getTodayDateString());
      setCategory(initialData.category || 'albums');
      setSelectedGroupId(initialData.groupId || '');
      setSelectedGroupName(initialData.groupName || '');
      setConcertId(initialData.concertId || '');
      setNotes(initialData.notes || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide a transaction name (e.g. NewJeans Album, Lightstick, Photocard)');
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Amount must be a positive number greater than 0.');
      return;
    }

    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    onSubmit({
      name: name.trim(),
      amount: numAmount,
      date,
      category,
      groupId: selectedGroupId || null,
      groupName: selectedGroupName || null,
      concertId: concertId || null,
      notes: notes.trim()
    });
  };

  const handleGroupSelect = (group) => {
    if (group) {
      setSelectedGroupId(group.id);
      setSelectedGroupName(group.name);
    } else {
      setSelectedGroupId('');
      setSelectedGroupName('');
    }
    setShowGroupPicker(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          color: '#DC2626',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Transaction Name */}
      <div className="form-group">
        <label className="form-label">
          <span>Expense Name *</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. TWICE With YOU-th Digipak, Binky Bong Lightstick"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Amount and Date */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div className="form-group">
          <label className="form-label">
            <span>Amount ({profile.currency || 'TWD'}) *</span>
          </label>
          <input
            type="number"
            className="form-input"
            placeholder="0"
            min="0.01"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span>Date *</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Category Selection with Interactive Cards */}
      <div className="form-group">
        <label className="form-label">
          <span>Category *</span>
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '8px',
          maxHeight: '180px',
          overflowY: 'auto',
          padding: '2px'
        }}>
          {EXPENSE_CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                style={{
                  background: isSelected ? cat.bgColor : 'var(--bg-card)',
                  borderColor: isSelected ? cat.color : 'var(--border-color)',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '18px' }}>{cat.emoji}</span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: isSelected ? cat.color : 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Associated Group Selector */}
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
            {showGroupPicker ? 'Close Selector' : selectedGroupName ? 'Change Group' : 'Choose Group'}
          </button>
        </div>

        {selectedGroupName && !showGroupPicker && (
          <div style={{
            background: 'var(--primary-light)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>✨ {selectedGroupName}</span>
            <button
              type="button"
              onClick={() => { setSelectedGroupId(''); setSelectedGroupName(''); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem' }}
            >
              Clear
            </button>
          </div>
        )}

        {showGroupPicker && (
          <div style={{
            background: 'var(--bg-main)',
            border: '1.5px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            marginTop: '6px'
          }}>
            <GroupSelector
              selectedGroupId={selectedGroupId}
              onSelectGroup={handleGroupSelect}
              placeholder="Search artist..."
            />
          </div>
        )}
      </div>

      {/* Associated Concert (Optional) */}
      {upcomingConcerts && upcomingConcerts.length > 0 && (
        <div className="form-group">
          <label className="form-label">
            <CalendarHeart size={15} color="var(--primary)" />
            <span>Associated Concert / Event (Optional)</span>
          </label>
          <select
            className="form-select"
            value={concertId}
            onChange={(e) => setConcertId(e.target.value)}
          >
            <option value="">None / Not Concert Related</option>
            {upcomingConcerts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.concertName} ({c.groupName}) - {c.date}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Notes */}
      <div className="form-group">
        <label className="form-label">
          <span>Notes / Photocard details (Optional)</span>
        </label>
        <textarea
          className="form-textarea"
          placeholder="e.g. Bought from Makestar fansign, Soundwave lucky draw round 2, traded with bestie ♡"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          <Sparkles size={16} />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
