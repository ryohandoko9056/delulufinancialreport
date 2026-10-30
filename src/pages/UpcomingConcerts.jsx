import React, { useState, useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { getTodayDateString } from '../utils/dateHelpers';
import { calculateUpcomingEstimatedTotal } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import ConcertCard from '../components/ConcertCard';
import ConcertCalendar from '../components/ConcertCalendar';
import ConvertConcertModal from '../components/ConvertConcertModal';
import Modal from '../components/Modal';
import GroupSelector from '../components/GroupSelector';
import { 
  CalendarHeart, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Sparkles, 
  Music2, 
  Ticket, 
  MapPin, 
  Link as LinkIcon 
} from 'lucide-react';

export default function UpcomingConcerts() {
  const {
    upcomingConcerts,
    savingsGoals,
    profile,
    addUpcomingConcert,
    updateUpcomingConcert,
    deleteUpcomingConcert,
    convertUpcomingToMemory
  } = useBudget();

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingConcert, setEditingConcert] = useState(null);
  const [convertingConcert, setConvertingConcert] = useState(null);

  // Form fields
  const [concertName, setConcertName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupPicker, setShowGroupPicker] = useState(false);
  const [date, setDate] = useState(getTodayDateString());
  const [time, setTime] = useState('19:00');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Taiwan');
  const [ticketingDate, setTicketingDate] = useState('');
  const [ticketingDeadline, setTicketingDeadline] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Planning to Buy');
  const [estimatedTicket, setEstimatedTicket] = useState('');
  const [estimatedTransport, setEstimatedTransport] = useState('');
  const [estimatedAccommodation, setEstimatedAccommodation] = useState('');
  const [estimatedFood, setEstimatedFood] = useState('');
  const [estimatedMerch, setEstimatedMerch] = useState('');
  const [estimatedOther, setEstimatedOther] = useState('');
  const [ticketingUrl, setTicketingUrl] = useState('');
  const [linkedGoalId, setLinkedGoalId] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Filtered upcoming concerts
  const filteredConcerts = useMemo(() => {
    return upcomingConcerts.filter((c) => {
      if (statusFilter !== 'all' && c.ticketStatus !== statusFilter) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = c.concertName ? c.concertName.toLowerCase().includes(query) : false;
        const matchesGroup = c.groupName ? c.groupName.toLowerCase().includes(query) : false;
        const matchesVenue = c.venue ? c.venue.toLowerCase().includes(query) : false;
        const matchesCity = c.city ? c.city.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesGroup && !matchesVenue && !matchesCity) return false;
      }
      return true;
    }).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  }, [upcomingConcerts, statusFilter, searchTerm]);

  const openAddModal = (presetDate = null) => {
    setEditingConcert(null);
    setConcertName('');
    setSelectedGroup(null);
    setShowGroupPicker(false);
    setDate(presetDate || getTodayDateString());
    setTime('19:00');
    setVenue('');
    setCity('');
    setCountry('Taiwan');
    setTicketingDate('');
    setTicketingDeadline('');
    setTicketStatus('Planning to Buy');
    setEstimatedTicket('');
    setEstimatedTransport('');
    setEstimatedAccommodation('');
    setEstimatedFood('');
    setEstimatedMerch('');
    setEstimatedOther('');
    setTicketingUrl('');
    setLinkedGoalId('');
    setNotes('');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (concert) => {
    setEditingConcert(concert);
    setConcertName(concert.concertName || '');
    setSelectedGroup({ id: concert.groupId, name: concert.groupName });
    setShowGroupPicker(false);
    setDate(concert.date || getTodayDateString());
    setTime(concert.time || '19:00');
    setVenue(concert.venue || '');
    setCity(concert.city || '');
    setCountry(concert.country || '');
    setTicketingDate(concert.ticketingDate || '');
    setTicketingDeadline(concert.ticketingDeadline || '');
    setTicketStatus(concert.ticketStatus || 'Planning to Buy');
    setEstimatedTicket(concert.estimatedTicket !== undefined ? String(concert.estimatedTicket) : '');
    setEstimatedTransport(concert.estimatedTransport !== undefined ? String(concert.estimatedTransport) : '');
    setEstimatedAccommodation(concert.estimatedAccommodation !== undefined ? String(concert.estimatedAccommodation) : '');
    setEstimatedFood(concert.estimatedFood !== undefined ? String(concert.estimatedFood) : '');
    setEstimatedMerch(concert.estimatedMerch !== undefined ? String(concert.estimatedMerch) : '');
    setEstimatedOther(concert.estimatedOther !== undefined ? String(concert.estimatedOther) : '');
    setTicketingUrl(concert.ticketingUrl || '');
    setLinkedGoalId(concert.linkedGoalId || '');
    setNotes(concert.notes || '');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!concertName.trim()) {
      setFormError('Please enter a concert or tour name.');
      return;
    }

    const payload = {
      concertName: concertName.trim(),
      groupId: selectedGroup?.id || null,
      groupName: selectedGroup?.name || 'K-pop Artist',
      date,
      time,
      venue: venue.trim(),
      city: city.trim(),
      country: country.trim(),
      ticketingDate: ticketingDate || null,
      ticketingDeadline: ticketingDeadline || null,
      ticketStatus,
      estimatedTicket: Number(estimatedTicket) || 0,
      estimatedTransport: Number(estimatedTransport) || 0,
      estimatedAccommodation: Number(estimatedAccommodation) || 0,
      estimatedFood: Number(estimatedFood) || 0,
      estimatedMerch: Number(estimatedMerch) || 0,
      estimatedOther: Number(estimatedOther) || 0,
      ticketingUrl: ticketingUrl.trim() || null,
      linkedGoalId: linkedGoalId || null,
      notes: notes.trim()
    };

    if (editingConcert) {
      updateUpcomingConcert(editingConcert.id, payload);
    } else {
      addUpcomingConcert(payload);
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="upcoming-concerts-page">
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
              Concert Planner & Calendar
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-hover)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {upcomingConcerts.length} Tours Scheduled
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            Countdowns, ticketing alerts, venue planning, and budget forecasts for your upcoming tours! 🎤✨
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openAddModal()}
        >
          <Plus size={16} />
          <span>Plan Upcoming Concert</span>
        </button>
      </div>

      {/* Interactive Concert Calendar Component */}
      <ConcertCalendar
        concerts={upcomingConcerts}
        onSelectDate={(dateStr) => openAddModal(dateStr)}
        onSelectConcert={(concert) => openEditModal(concert)}
      />

      {/* Filters & Search Toolbar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '240px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px' }}
              placeholder="Search planned concerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Ticket Statuses</option>
            <option value="Planning to Buy">Planning to Buy 🎫</option>
            <option value="Ticket Purchased">Ticket Purchased ✨</option>
            <option value="Not Available">Not Available ⏳</option>
            <option value="Sold Out">Sold Out 😭</option>
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
          Showing <strong>{filteredConcerts.length}</strong> concerts
        </div>
      </div>

      {/* Concert Cards Grid */}
      {filteredConcerts.length === 0 ? (
        <div className="empty-state delulu-card">
          <div className="empty-state-emoji">🎟️</div>
          <div className="empty-state-title">No upcoming concerts found</div>
          <div className="empty-state-desc">
            {searchTerm || statusFilter !== 'all'
              ? 'Try clearing your filters to view all scheduled events!'
              : 'Add your favorite group’s world tour dates, ticketing deadlines, and expense estimates!'}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openAddModal()}
          >
            <Plus size={16} /> Plan a Concert
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {filteredConcerts.map((concert) => {
            const linkedGoal = concert.linkedGoalId 
              ? savingsGoals.find(g => g.id === concert.linkedGoalId)
              : null;

            return (
              <ConcertCard
                key={concert.id}
                type="upcoming"
                concert={concert}
                currencyCode={profile.currency}
                onEdit={openEditModal}
                onDelete={deleteUpcomingConcert}
                onMarkAttended={(c) => setConvertingConcert(c)}
                linkedSavingsGoal={linkedGoal}
              />
            );
          })}
        </div>
      )}

      {/* Add / Edit Concert Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingConcert ? '✏️ Edit Upcoming Concert' : '🎤 Plan Upcoming Concert'}
        maxWidth="640px"
      >
        <form onSubmit={handleFormSubmit}>
          {formError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '14px', fontWeight: 700 }}>
              {formError}
            </div>
          )}

          {/* Concert Name */}
          <div className="form-group">
            <label className="form-label">Concert / Tour Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. TWICE 5TH WORLD TOUR 'READY TO BE' in Taipei"
              value={concertName}
              onChange={(e) => setConcertName(e.target.value)}
              required
            />
          </div>

          {/* Group Selector */}
          <div className="form-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                <Music2 size={15} color="var(--primary)" />
                <span>K-pop Group / Solo Artist</span>
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

          {/* Date, Time, Venue, City, Country */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label">Concert Date *</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Venue</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Taipei Arena"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-input"
                placeholder="Taipei"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* Ticketing Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '10px' }}>
            <div className="form-group">
              <label className="form-label">Ticket Status</label>
              <select
                className="form-select"
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option value="Not Available">Not Available</option>
                <option value="Planning to Buy">Planning to Buy</option>
                <option value="Ticket Purchased">Ticket Purchased</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Ticketing Date & Time</label>
              <input
                type="date"
                className="form-input"
                value={ticketingDate}
                onChange={(e) => setTicketingDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ticketing Website URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://..."
                value={ticketingUrl}
                onChange={(e) => setTicketingUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Estimated Expenses Breakdown */}
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', margin: '10px 0 6px' }}>
            Estimated Concert Expenses ({profile.currency || 'TWD'})
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Ticket</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedTicket}
                onChange={(e) => setEstimatedTicket(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Transport</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedTransport}
                onChange={(e) => setEstimatedTransport(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Hotel</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedAccommodation}
                onChange={(e) => setEstimatedAccommodation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Food</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedFood}
                onChange={(e) => setEstimatedFood(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Merch</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedMerch}
                onChange={(e) => setEstimatedMerch(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Est. Other</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={estimatedOther}
                onChange={(e) => setEstimatedOther(e.target.value)}
              />
            </div>
          </div>

          {/* Link to Savings Goal */}
          {savingsGoals.length > 0 && (
            <div className="form-group">
              <label className="form-label">
                <LinkIcon size={14} color="var(--primary)" />
                <span>Link to Savings Goal (Optional)</span>
              </label>
              <select
                className="form-select"
                value={linkedGoalId}
                onChange={(e) => setLinkedGoalId(e.target.value)}
              >
                <option value="">None / No linked savings goal</option>
                {savingsGoals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({formatCurrency(g.currentAmount, profile.currency)} / {formatCurrency(g.targetAmount, profile.currency)})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. VIP floor tickets sale on Friday at 11am! Make sure lightstick batteries are packed!"
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
              <span>{editingConcert ? 'Update Concert' : 'Schedule Concert'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Convert to Memory Modal */}
      <ConvertConcertModal
        isOpen={Boolean(convertingConcert)}
        onClose={() => setConvertingConcert(null)}
        concert={convertingConcert}
        currencyCode={profile.currency}
        onConfirmConversion={convertUpcomingToMemory}
      />
    </div>
  );
}
