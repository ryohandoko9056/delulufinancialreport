import React, { useState } from 'react';
import { Heart, UserPlus, Check, X } from 'lucide-react';

export default function MemberSelector({
  group,
  selectedMemberName,
  onSelectMember,
  label = "Select Bias",
  allowCustomFallback = true
}) {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');

  const members = group?.members || [];

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onSelectMember(customName.trim());
    setCustomName('');
    setIsAddingCustom(false);
  };

  if (!group) {
    return (
      <div style={{ padding: '16px', background: 'var(--primary-ultralight)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Please select a K-pop group first to view available members ♡
      </div>
    );
  }

  return (
    <div className="member-selector-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span className="form-label">
          <Heart size={14} color="var(--primary)" /> {label} ({group.name})
        </span>
        {allowCustomFallback && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ fontSize: '0.72rem', padding: '3px 8px' }}
            onClick={() => setIsAddingCustom((p) => !p)}
          >
            <UserPlus size={12} />
            {isAddingCustom ? 'Cancel' : 'Other Member'}
          </button>
        )}
      </div>

      {isAddingCustom && (
        <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
            placeholder="Type member name..."
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-sm">Set</button>
        </form>
      )}

      {members.length === 0 ? (
        <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          No predefined member list available for {group.name}. You can type a member name above!
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '8px',
          maxHeight: '190px',
          overflowY: 'auto',
          padding: '2px'
        }}>
          {members.map((member) => {
            const isSelected = selectedMemberName === member.name;
            const isFormer = member.status === 'former';
            const isMemorial = member.status === 'memorial';

            return (
              <button
                key={member.id || member.name}
                type="button"
                onClick={() => onSelectMember(isSelected ? '' : member.name)}
                style={{
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.82rem', color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)' }}>
                    {member.name}
                  </span>
                  {isSelected && <Check size={12} color="var(--primary)" />}
                </div>
                {member.realName && member.realName !== member.name && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {member.realName}
                  </span>
                )}
                {isFormer && (
                  <span style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 700 }}>
                    Former Member
                  </span>
                )}
                {isMemorial && (
                  <span style={{ fontSize: '0.65rem', color: '#8B5CF6', fontWeight: 700 }}>
                    Memorial 🕊️
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedMemberName && (
        <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Current selection: <strong>{selectedMemberName}</strong></span>
          <button
            type="button"
            onClick={() => onSelectMember('')}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            title="Clear"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
