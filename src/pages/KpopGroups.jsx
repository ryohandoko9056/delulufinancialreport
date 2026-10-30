import React, { useState, useMemo } from 'react';
import { KPOP_GROUPS, GENERATIONS, GROUP_TYPES } from '../data/kpopGroups';
import { useBudget } from '../hooks/useBudget';
import { Search, Heart, Sparkles, Plus, Users, Music2, ShieldCheck, Star } from 'lucide-react';
import Modal from '../components/Modal';

export default function KpopGroups() {
  const { customGroups, addCustomGroup, profile, updateProfile, addToast } = useBudget();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGen, setSelectedGen] = useState('all');
  const [selectedGroupModal, setSelectedGroupModal] = useState(null);

  // Custom group modal
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState('girl_group');
  const [customDebutYear, setCustomDebutYear] = useState('2024');
  const [customAgency, setCustomAgency] = useState('');
  const [customFandom, setCustomFandom] = useState('');
  const [customMembers, setCustomMembers] = useState('');

  const allGroups = useMemo(() => {
    return [...KPOP_GROUPS, ...(customGroups || [])];
  }, [customGroups]);

  const filteredGroups = useMemo(() => {
    return allGroups.filter((g) => {
      if (selectedType !== 'all' && g.type !== selectedType) return false;
      if (selectedGen !== 'all' && g.generation !== selectedGen) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(query);
        const matchesFandom = g.fandomName ? g.fandomName.toLowerCase().includes(query) : false;
        const matchesAgency = g.agency ? g.agency.toLowerCase().includes(query) : false;
        const matchesMember = g.members ? g.members.some(m => m.name.toLowerCase().includes(query) || (m.realName && m.realName.toLowerCase().includes(query))) : false;
        if (!matchesName && !matchesFandom && !matchesAgency && !matchesMember) return false;
      }
      return true;
    });
  }, [allGroups, selectedType, selectedGen, searchTerm]);

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const parsedMembers = customMembers
      .split(',')
      .map(m => m.trim())
      .filter(Boolean)
      .map((name, idx) => ({
        id: `custom_m_${idx}_${Date.now()}`,
        name,
        status: 'active'
      }));

    addCustomGroup({
      name: customName.trim(),
      type: customType,
      debutYear: Number(customDebutYear) || 2024,
      generation: Number(customDebutYear) >= 2023 ? '5th' : '4th',
      agency: customAgency.trim() || 'Independent',
      fandomName: customFandom.trim() || '',
      description: 'Custom added artist',
      members: parsedMembers
    });

    setCustomName('');
    setCustomAgency('');
    setCustomFandom('');
    setCustomMembers('');
    setIsCustomModalOpen(false);
  };

  const setAsPrimary = (group) => {
    updateProfile({
      primaryGroupId: group.id,
      primaryGroupName: group.name,
      bias: group.members && group.members.length > 0 ? group.members[0].name : profile.bias
    });
    addToast(`Set ${group.name} as your primary group! 🎀`, 'success');
    setSelectedGroupModal(null);
  };

  const setMemberAsBias = (group, memberName) => {
    updateProfile({
      primaryGroupId: group.id,
      primaryGroupName: group.name,
      bias: memberName
    });
    addToast(`Set ${memberName} (${group.name}) as your bias! ♡`, 'success');
  };

  return (
    <div className="kpop-groups-page">
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
              K-pop Database & Idols
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-hover)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {allGroups.length} Artists
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            Explore girl groups, boy groups, solos, and generations. Select your favorite group & bias! 🎀
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCustomModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Custom Group / Solo</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
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
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search by artist name, member name, fandom, agency..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {GROUP_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                className="btn btn-sm"
                style={{
                  background: selectedType === t.id ? 'var(--primary)' : 'var(--bg-main)',
                  color: selectedType === t.id ? 'white' : 'var(--text-muted)',
                  border: '1px solid',
                  borderColor: selectedType === t.id ? 'var(--primary)' : 'var(--border-color)',
                  fontWeight: 700
                }}
                onClick={() => setSelectedType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span style={{ color: 'var(--border-color)', padding: '0 4px' }}>|</span>

          {/* Gen Filter */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {GENERATIONS.map((g) => (
              <button
                key={g.id}
                type="button"
                className="btn btn-sm"
                style={{
                  background: selectedGen === g.id ? 'var(--primary-light)' : 'transparent',
                  color: selectedGen === g.id ? 'var(--primary-hover)' : 'var(--text-muted)',
                  border: '1px solid',
                  borderColor: selectedGen === g.id ? 'var(--primary)' : 'transparent',
                  fontWeight: 700
                }}
                onClick={() => setSelectedGen(g.id)}
              >
                {g.id === 'all' ? 'All Gens' : `${g.id} Gen`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '18px'
      }}>
        {filteredGroups.map((group) => {
          const isPrimary = profile.primaryGroupId === group.id;

          return (
            <div
              key={group.id}
              className="delulu-card group-catalog-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: isPrimary ? 'var(--primary)' : 'var(--border-color)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>
                      {group.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      {group.generation ? `${group.generation} Gen` : ''} • Debut {group.debutYear} • {group.agency || 'Independent'}
                    </div>
                  </div>

                  {isPrimary && (
                    <span style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary-hover)',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <Star size={11} fill="var(--primary)" /> Primary Ult
                    </span>
                  )}
                </div>

                {group.fandomName && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--primary-hover)', fontWeight: 700, marginBottom: '6px' }}>
                    Fandom: <strong>{group.fandomName}</strong>
                  </div>
                )}

                {group.description && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                    {group.description}
                  </p>
                )}

                {/* Member chips preview */}
                {group.members && group.members.length > 0 && (
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Members ({group.members.length})
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {group.members.slice(0, 8).map((m) => {
                        const isBias = profile.bias === m.name && profile.primaryGroupId === group.id;
                        return (
                          <span
                            key={m.id || m.name}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 'var(--radius-full)',
                              background: isBias ? 'var(--primary)' : 'var(--bg-main)',
                              color: isBias ? 'white' : 'var(--text-main)',
                              border: '1px solid',
                              borderColor: isBias ? 'var(--primary)' : 'var(--border-light)'
                            }}
                          >
                            {isBias ? `♡ ${m.name}` : m.name}
                          </span>
                        );
                      })}
                      {group.members.length > 8 && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 700 }}>
                          +{group.members.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setSelectedGroupModal(group)}
                >
                  View All Members
                </button>
                {!isPrimary && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setAsPrimary(group)}
                  >
                    Set as Ult
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Details Modal */}
      <Modal
        isOpen={Boolean(selectedGroupModal)}
        onClose={() => setSelectedGroupModal(null)}
        title={selectedGroupModal ? `${selectedGroupModal.name} Members ♡` : 'Members'}
        maxWidth="540px"
      >
        {selectedGroupModal && (
          <div>
            <div style={{ background: 'var(--primary-light)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
                {selectedGroupModal.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {selectedGroupModal.generation} Gen • Debut {selectedGroupModal.debutYear} • {selectedGroupModal.agency}
              </div>
              {selectedGroupModal.fandomName && (
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700, marginTop: '2px' }}>
                  Fandom: {selectedGroupModal.fandomName}
                </div>
              )}
            </div>

            <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
              Click any member to set as your Bias:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' }}>
              {selectedGroupModal.members && selectedGroupModal.members.map((member) => {
                const isCurrentBias = profile.bias === member.name && profile.primaryGroupId === selectedGroupModal.id;

                return (
                  <button
                    key={member.id || member.name}
                    type="button"
                    className="btn btn-outline"
                    style={{
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      background: isCurrentBias ? 'var(--primary-light)' : 'var(--bg-card)',
                      borderColor: isCurrentBias ? 'var(--primary)' : 'var(--border-color)',
                      textAlign: 'left'
                    }}
                    onClick={() => setMemberAsBias(selectedGroupModal, member.name)}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: isCurrentBias ? 'var(--primary-hover)' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Heart size={12} fill={isCurrentBias ? 'var(--primary)' : 'none'} color="var(--primary)" />
                      <span>{member.name}</span>
                    </div>
                    {member.realName && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {member.realName}
                      </span>
                    )}
                    {member.status === 'former' && (
                      <span style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 800 }}>Former</span>
                    )}
                    {member.status === 'memorial' && (
                      <span style={{ fontSize: '0.65rem', color: '#8B5CF6', fontWeight: 800 }}>Memorial 🕊️</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Custom Artist Modal */}
      <Modal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="✨ Add Custom K-pop Artist"
        maxWidth="500px"
      >
        <form onSubmit={handleCreateCustom}>
          <div className="form-group">
            <label className="form-label">Artist / Group Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. My Favorite Rookie"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={customType} onChange={(e) => setCustomType(e.target.value)}>
                <option value="girl_group">Girl Group</option>
                <option value="boy_group">Boy Group</option>
                <option value="coed_group">Co-ed Group</option>
                <option value="solo">Solo Artist</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Debut Year</label>
              <input
                type="number"
                className="form-input"
                value={customDebutYear}
                onChange={(e) => setCustomDebutYear(e.target.value)}
                min="1990"
                max="2030"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Agency / Label</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Independent, JYP, SM"
                value={customAgency}
                onChange={(e) => setCustomAgency(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Fandom Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Starlight"
                value={customFandom}
                onChange={(e) => setCustomFandom(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Member Names (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Member 1, Member 2, Member 3"
              value={customMembers}
              onChange={(e) => setCustomMembers(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsCustomModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Artist
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
