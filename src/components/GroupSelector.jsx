import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Music2, Sparkles, X } from 'lucide-react';
import { KPOP_GROUPS, GENERATIONS, GROUP_TYPES } from '../data/kpopGroups';
import { useBudget } from '../hooks/useBudget';

export default function GroupSelector({ 
  selectedGroupId, 
  onSelectGroup, 
  showCustomOption = true,
  placeholder = "Search or select a K-pop artist..." 
}) {
  const { customGroups, addCustomGroup } = useBudget();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGen, setSelectedGen] = useState('all');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState('girl_group');
  const [customDebutYear, setCustomDebutYear] = useState('2024');

  // Combined predefined + custom groups
  const allGroups = useMemo(() => {
    return [...KPOP_GROUPS, ...(customGroups || [])];
  }, [customGroups]);

  // Filtered groups
  const filteredGroups = useMemo(() => {
    return allGroups.filter((g) => {
      // Type filter
      if (selectedType !== 'all' && g.type !== selectedType) return false;
      // Generation filter
      if (selectedGen !== 'all' && g.generation !== selectedGen) return false;
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(query);
        const matchesFandom = g.fandomName ? g.fandomName.toLowerCase().includes(query) : false;
        const matchesMember = g.members ? g.members.some(m => m.name.toLowerCase().includes(query)) : false;
        if (!matchesName && !matchesFandom && !matchesMember) return false;
      }
      return true;
    });
  }, [allGroups, selectedType, selectedGen, searchTerm]);

  const selectedGroup = useMemo(() => {
    return allGroups.find(g => g.id === selectedGroupId) || null;
  }, [allGroups, selectedGroupId]);

  const handleCreateCustomGroup = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newGroup = addCustomGroup({
      name: customName.trim(),
      type: customType,
      debutYear: Number(customDebutYear) || 2024,
      generation: Number(customDebutYear) >= 2023 ? '5th' : '4th',
      agency: 'Custom / Independent',
      members: []
    });

    onSelectGroup(newGroup);
    setCustomName('');
    setIsAddingCustom(false);
  };

  return (
    <div className="group-selector-container">
      {/* Search and Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <X size={15} color="var(--text-muted)" />
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {GROUP_TYPES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
            value={selectedGen}
            onChange={(e) => setSelectedGen(e.target.value)}
          >
            {GENERATIONS.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>

          {showCustomOption && (
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ marginLeft: 'auto' }}
              onClick={() => setIsAddingCustom((prev) => !prev)}
            >
              <Plus size={14} />
              <span>{isAddingCustom ? 'Cancel Custom' : 'Add Custom Group'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Custom Group Creator Inline Form */}
      {isAddingCustom && (
        <form onSubmit={handleCreateCustomGroup} style={{ background: 'var(--primary-ultralight)', border: '1.5px dashed var(--primary)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '14px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary-hover)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} /> Add Custom K-pop Artist
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Artist / Group Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dream Team"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Type</label>
              <select className="form-select" value={customType} onChange={(e) => setCustomType(e.target.value)}>
                <option value="girl_group">Girl Group</option>
                <option value="boy_group">Boy Group</option>
                <option value="coed_group">Co-ed Group</option>
                <option value="solo">Solo Artist</option>
              </select>
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Debut Year</label>
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
          <button type="submit" className="btn btn-primary btn-sm">
            Save & Select Custom Group
          </button>
        </form>
      )}

      {/* Selected Group Preview Card */}
      {selectedGroup && (
        <div style={{
          background: 'var(--primary-light)',
          border: '1.5px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              Selected: {selectedGroup.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {selectedGroup.generation ? `${selectedGroup.generation} Gen` : ''} • Debut {selectedGroup.debutYear} • {selectedGroup.agency || 'Independent'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-hover)', background: 'white', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
              Active
            </span>
            <button
              type="button"
              className="btn btn-outline btn-icon"
              style={{ width: '28px', height: '28px' }}
              onClick={() => onSelectGroup(null)}
              title="Clear selection"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Group Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '10px',
        maxHeight: '260px',
        overflowY: 'auto',
        padding: '4px'
      }}>
        {filteredGroups.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px 10px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            No groups found matching "{searchTerm}". Try adding as custom!
          </div>
        ) : (
          filteredGroups.map((g) => {
            const isSelected = selectedGroupId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onSelectGroup(g)}
                style={{
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                  boxShadow: isSelected ? '0 2px 10px rgba(255,117,151,0.2)' : 'none',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? 'var(--primary-hover)' : 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {g.name}
                  </span>
                  {isSelected && <Check size={14} color="var(--primary)" />}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {g.generation ? `${g.generation} Gen` : ''} ({g.debutYear})
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
