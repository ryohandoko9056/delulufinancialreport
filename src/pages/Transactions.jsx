import React, { useState } from 'react';
import { useBudget } from '../hooks/useBudget';
import TransactionList from '../components/TransactionList';
import Modal from '../components/Modal';
import TransactionForm from '../components/TransactionForm';
import { Plus, ReceiptText, Sparkles } from 'lucide-react';

export default function Transactions() {
  const { transactions, profile, addTransaction, selectedMonth } = useBudget();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSubmit = (txData) => {
    addTransaction(txData);
    setIsAddModalOpen(false);
  };

  return (
    <div className="transactions-page">
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
              Transaction History
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-hover)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {transactions.length} Total Records
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            Track every album, photocard, lightstick, concert ticket, and cup sleeve event! 🛍️
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add New Expense</span>
        </button>
      </div>

      <TransactionList
        transactions={transactions}
        currencyCode={profile.currency}
      />

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="🎀 Record K-pop Expense"
      >
        <TransactionForm
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
          submitLabel="Save Expense"
        />
      </Modal>
    </div>
  );
}
