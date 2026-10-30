import React, { useState, useMemo } from 'react';
import { EXPENSE_CATEGORIES, getCategoryById } from '../data/categories';
import { formatCurrency } from '../utils/currency';
import { formatDisplayDate } from '../utils/dateHelpers';
import { useBudget } from '../hooks/useBudget';
import { Search, Filter, ArrowUpDown, Trash2, Edit3, Sparkles } from 'lucide-react';
import Modal from './Modal';
import TransactionForm from './TransactionForm';

export default function TransactionList({
  transactions = [],
  currencyCode = 'TWD',
  initialMonthFilter = null,
  limit = null
}) {
  const { updateTransaction, deleteTransaction } = useBudget();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [monthFilter, setMonthFilter] = useState(initialMonthFilter || 'all');
  const [sortBy, setSortBy] = useState('date_desc'); // date_desc, date_asc, amount_desc, amount_asc

  // Editing state
  const [editingTransaction, setEditingTransaction] = useState(null);
  // Deleting confirmation state
  const [deletingId, setDeletingId] = useState(null);

  // Available unique months from transactions
  const availableMonths = useMemo(() => {
    const set = new Set();
    transactions.forEach(t => {
      if (t.date && t.date.length >= 7) {
        set.add(t.date.substring(0, 7));
      }
    });
    return Array.from(set).sort().reverse();
  }, [transactions]);

  // Filter & sort logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Month
      if (monthFilter !== 'all' && (!t.date || !t.date.startsWith(monthFilter))) {
        return false;
      }
      // Category
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = t.name ? t.name.toLowerCase().includes(query) : false;
        const matchesGroup = t.groupName ? t.groupName.toLowerCase().includes(query) : false;
        const matchesNotes = t.notes ? t.notes.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesGroup && !matchesNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') {
        return (b.date || '').localeCompare(a.date || '');
      } else if (sortBy === 'date_asc') {
        return (a.date || '').localeCompare(b.date || '');
      } else if (sortBy === 'amount_desc') {
        return (Number(b.amount) || 0) - (Number(a.amount) || 0);
      } else if (sortBy === 'amount_asc') {
        return (Number(a.amount) || 0) - (Number(b.amount) || 0);
      }
      return 0;
    });
  }, [transactions, monthFilter, selectedCategory, searchTerm, sortBy]);

  const displayedTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  const totalFilteredAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  }, [filteredTransactions]);

  const handleEditSubmit = (updatedData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, updatedData);
      setEditingTransaction(null);
    }
  };

  const confirmDelete = () => {
    if (deletingId) {
      deleteTransaction(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="transaction-list-container">
      {/* Search and Filters Toolbar (Only show when not heavily limited) */}
      {!limit && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="Search expense, group, notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories (✨)</option>
              {EXPENSE_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>

            {/* Month Filter */}
            <select
              className="form-select"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              <option value="all">All Months</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date_desc">Date: Newest First</option>
              <option value="date_asc">Date: Oldest First</option>
              <option value="amount_desc">Amount: Highest First</option>
              <option value="amount_asc">Amount: Lowest First</option>
            </select>
          </div>

          {/* Filter summary status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
            <div>
              Showing <strong>{filteredTransactions.length}</strong> transactions
            </div>
            <div>
              Total Filtered Spending: <strong style={{ color: 'var(--primary-hover)', fontSize: '1rem' }}>{formatCurrency(totalFilteredAmount, currencyCode)}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Records */}
      {displayedTransactions.length === 0 ? (
        <div className="empty-state delulu-card">
          <div className="empty-state-emoji">🛍️</div>
          <div className="empty-state-title">No transactions found</div>
          <div className="empty-state-desc">
            {searchTerm || selectedCategory !== 'all' || monthFilter !== 'all'
              ? 'Try adjusting your search filters to find what you are looking for!'
              : 'You have not recorded any expenses yet. Start tracking your K-pop purchases!'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayedTransactions.map((tx) => {
            const cat = getCategoryById(tx.category);
            return (
              <div
                key={tx.id}
                className="delulu-card"
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {/* Category Icon & Name Group */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', flex: 1 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: cat.bgColor,
                      color: cat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0
                    }}
                  >
                    {cat.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
                      {tx.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                      <span style={{ fontWeight: 700, color: cat.color }}>{cat.name}</span>
                      <span>•</span>
                      <span>{formatDisplayDate(tx.date)}</span>
                      {tx.groupName && (
                        <>
                          <span>•</span>
                          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-hover)', padding: '1px 6px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.72rem' }}>
                            {tx.groupName}
                          </span>
                        </>
                      )}
                    </div>
                    {tx.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                        "{tx.notes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Amount and Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)' }}>
                      {formatCurrency(tx.amount, currencyCode)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-icon"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => setEditingTransaction(tx)}
                      title="Edit transaction"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-icon"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => setDeletingId(tx.id)}
                      title="Delete transaction"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={Boolean(editingTransaction)}
        onClose={() => setEditingTransaction(null)}
        title="✏️ Edit Transaction"
      >
        {editingTransaction && (
          <TransactionForm
            initialData={editingTransaction}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingTransaction(null)}
            submitLabel="Update Transaction"
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="Delete Transaction?"
        maxWidth="440px"
        footer={(
          <>
            <button type="button" className="btn btn-outline" onClick={() => setDeletingId(null)}>
              Keep Expense
            </button>
            <button type="button" className="btn btn-danger" onClick={confirmDelete}>
              Yes, Delete
            </button>
          </>
        )}
      >
        <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
          Are you sure you want to delete this transaction? All associated monthly calculations, budget charts, and totals will update immediately.
        </p>
      </Modal>
    </div>
  );
}
