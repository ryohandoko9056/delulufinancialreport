import React, { useState } from 'react';
import { useBudget, THEMES } from '../context/BudgetContext';
import { CURRENCIES } from '../utils/currency';
import { compressImageFile } from '../utils/storage';
import GroupSelector from '../components/GroupSelector';
import MemberSelector from '../components/MemberSelector';
import Modal from '../components/Modal';
import { 
  User, 
  Palette, 
  Coins, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  AlertTriangle,
  Heart,
  Music2,
  Camera
} from 'lucide-react';

export default function Settings() {
  const {
    profile,
    updateProfile,
    setTheme,
    exportData,
    importData,
    resetAllData,
    customGroups
  } = useBudget();

  // Profile Form State
  const [nickname, setNickname] = useState(profile.nickname || '');
  const [monthlyBudget, setMonthlyBudget] = useState(profile.monthlyBudget || 15000);
  const [selectedCurrency, setSelectedCurrency] = useState(profile.currency || 'TWD');
  const [primaryGroupId, setPrimaryGroupId] = useState(profile.primaryGroupId || '');
  const [primaryGroupName, setPrimaryGroupName] = useState(profile.primaryGroupName || '');
  const [bias, setBias] = useState(profile.bias || '');
  const [biasWrecker, setBiasWrecker] = useState(profile.biasWrecker || '');
  const [avatar, setAvatar] = useState(profile.avatar || null);
  const [showGroupSelector, setShowGroupSelector] = useState(false);

  // Reset confirmation modal
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importError, setImportError] = useState('');

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file);
      setAvatar(compressedDataUrl);
      updateProfile({ avatar: compressedDataUrl });
    } catch (err) {
      alert('Failed to process image: ' + err.message);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      nickname: nickname.trim(),
      monthlyBudget: Math.max(0, Number(monthlyBudget) || 0),
      currency: selectedCurrency,
      primaryGroupId,
      primaryGroupName,
      bias: bias.trim(),
      biasWrecker: biasWrecker.trim(),
      avatar
    });
  };

  const handleGroupSelect = (grp) => {
    if (grp) {
      setPrimaryGroupId(grp.id);
      setPrimaryGroupName(grp.name);
      setBias('');
      setBiasWrecker('');
    } else {
      setPrimaryGroupId('');
      setPrimaryGroupName('');
      setBias('');
      setBiasWrecker('');
    }
    setShowGroupSelector(false);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const result = importData(content);
        if (result.success) {
          setIsImportModalOpen(false);
        } else {
          setImportError(result.error);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleManualJsonImport = () => {
    if (!importJsonText.trim()) return;
    const result = importData(importJsonText);
    if (result.success) {
      setIsImportModalOpen(false);
      setImportJsonText('');
    } else {
      setImportError(result.error);
    }
  };

  return (
    <div className="settings-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Fan Profile & Application Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
          Customize your stan profile, select your ult group and bias, choose color themes, and manage backups! 🌸
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Profile Settings Form */}
        <form onSubmit={handleSaveProfile} className="delulu-card">
          <div className="delulu-card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <User size={18} />
              </div>
              <div>
                <h3 className="delulu-card-title">K-pop Fan Profile</h3>
                <div className="delulu-card-subtitle">Personalize your fan dashboard</div>
              </div>
            </div>
          </div>

          {/* Avatar & Nickname */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
                overflow: 'hidden',
                border: '2px solid var(--border-color)'
              }}>
                {avatar ? (
                  <img src={avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  nickname ? nickname.charAt(0).toUpperCase() : '♡'
                )}
              </div>
              <label
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: 'var(--primary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                }}
                title="Upload Profile Picture"
              >
                <Camera size={13} />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ flex: 1 }}>
              <label className="form-label">Stan Nickname *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hanni Bunny, Carat Bestie"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Primary Group Selector */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                <Music2 size={15} color="var(--primary)" />
                <span>Primary / Ult Group</span>
              </label>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                onClick={() => setShowGroupSelector((p) => !p)}
              >
                {showGroupSelector ? 'Close' : primaryGroupName ? 'Change Group' : 'Select Group'}
              </button>
            </div>

            {primaryGroupName && !showGroupSelector && (
              <div style={{
                background: 'var(--primary-light)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontWeight: 800,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>💖 {primaryGroupName}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-hover)' }}>Selected Ult</span>
              </div>
            )}

            {showGroupSelector && (
              <div style={{ background: 'var(--bg-main)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '12px', marginTop: '6px' }}>
                <GroupSelector
                  selectedGroupId={primaryGroupId}
                  onSelectGroup={handleGroupSelect}
                />
              </div>
            )}
          </div>

          {/* Bias and Bias Wrecker */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">
                <Heart size={14} color="var(--primary)" />
                <span>Your Bias (Favorite)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Hanni, Felix, Karina"
                value={bias}
                onChange={(e) => setBias(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Sparkles size={14} color="var(--primary)" />
                <span>Bias Wrecker (Optional)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Minji, Hyunjin, Winter"
                value={biasWrecker}
                onChange={(e) => setBiasWrecker(e.target.value)}
              />
            </div>
          </div>

          {/* Preferred Currency & Default Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">
                <Coins size={14} color="var(--primary)" />
                <span>Preferred Currency</span>
              </label>
              <select
                className="form-select"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Default Monthly Budget</label>
              <input
                type="number"
                className="form-input"
                min="0"
                step="any"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Sparkles size={16} />
              <span>Save Profile Preferences</span>
            </button>
          </div>
        </form>

        {/* Right Column: Theme & Data Management */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Aesthetic Color Themes */}
          <div className="delulu-card">
            <div className="delulu-card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <Palette size={18} />
                </div>
                <div>
                  <h3 className="delulu-card-title">Aesthetic Themes</h3>
                  <div className="delulu-card-subtitle">Choose your pastel color palette</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {THEMES.map((th) => {
                const isActive = profile.theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id)}
                    style={{
                      background: isActive ? th.secondary : 'var(--bg-card)',
                      border: '2px solid',
                      borderColor: isActive ? th.primary : 'var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: th.primary,
                      border: '2px solid white',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {th.name}
                    </span>
                    {isActive && (
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: th.primary }}>
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Backup, Export, Import & Reset */}
          <div className="delulu-card">
            <div className="delulu-card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <Download size={18} />
                </div>
                <div>
                  <h3 className="delulu-card-title">Data Backup & Reset</h3>
                  <div className="delulu-card-subtitle">Keep your financial records safe</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              All records are stored locally in your browser. You can export a JSON backup at any time to restore on another browser or device!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={exportData}
              >
                <Download size={16} />
                <span>Export Data Backup (JSON)</span>
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setImportError('');
                  setIsImportModalOpen(true);
                }}
              >
                <Upload size={16} />
                <span>Import JSON Backup</span>
              </button>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ width: '100%' }}
                  onClick={() => setIsResetModalOpen(true)}
                >
                  <RotateCcw size={16} />
                  <span>Reset All Data to Default</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="📥 Import Data Backup"
        maxWidth="500px"
      >
        <div>
          {importError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '14px', fontWeight: 700 }}>
              {importError}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label className="form-label">Upload JSON Backup File</label>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              className="form-input"
            />
          </div>

          <div style={{ textAlign: 'center', margin: '12px 0', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            — OR PASTE JSON DIRECTLY —
          </div>

          <div className="form-group">
            <textarea
              className="form-textarea"
              placeholder="Paste backup JSON content here..."
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              rows={4}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsImportModalOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleManualJsonImport}
              disabled={!importJsonText.trim()}
            >
              Apply Backup
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="⚠️ Reset All Application Data?"
        maxWidth="440px"
        footer={(
          <>
            <button type="button" className="btn btn-outline" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                resetAllData();
                setIsResetModalOpen(false);
              }}
            >
              Yes, Reset Everything
            </button>
          </>
        )}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ background: '#FEE2E2', color: '#DC2626', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              This will erase all locally stored data!
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              All transactions, custom monthly budgets, concert memories, upcoming tour events, and custom groups will be wiped and restored to initial clean defaults.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
