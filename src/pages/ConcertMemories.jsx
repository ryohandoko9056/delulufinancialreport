import React, { useState, useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { calculateConcertMemoriesStats } from '../utils/calculations';
import { formatCurrency } from '../utils/currency';
import { compressImageFile } from '../utils/storage';
import { getTodayDateString } from '../utils/dateHelpers';
import ConcertCard from '../components/ConcertCard';
import Modal from '../components/Modal';
import GroupSelector from '../components/GroupSelector';
import DashboardCard from '../components/DashboardCard';
import { 
  Camera, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Trophy, 
  Calendar, 
  MapPin, 
  Music2, 
  Sparkles, 
  DollarSign,
  ImagePlus,
  X
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ConcertMemories() {
  const { concertMemories, profile, addConcertMemory, updateConcertMemory, deleteConcertMemory } = useBudget();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc'); // date_desc, date_asc, cost_desc, cost_asc, rating_desc

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);

  // Form Fields
  const [concertName, setConcertName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupPicker, setShowGroupPicker] = useState(false);
  const [date, setDate] = useState(getTodayDateString());
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Taiwan');
  const [seatingSection, setSeatingSection] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [accommodationCost, setAccommodationCost] = useState('');
  const [foodCost, setFoodCost] = useState('');
  const [merchCost, setMerchCost] = useState('');
  const [otherCost, setOtherCost] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState('');

  // Stats calculation
  const stats = useMemo(() => {
    return calculateConcertMemoriesStats(concertMemories);
  }, [concertMemories]);

  // Unique groups & years for filtering
  const availableGroups = useMemo(() => {
    const set = new Set();
    concertMemories.forEach(m => {
      if (m.groupName) set.add(m.groupName);
    });
    return Array.from(set).sort();
  }, [concertMemories]);

  const availableYears = useMemo(() => {
    const set = new Set();
    concertMemories.forEach(m => {
      if (m.date) set.add(m.date.split('-')[0]);
    });
    return Array.from(set).sort().reverse();
  }, [concertMemories]);

  // Filtered & sorted memories
  const filteredMemories = useMemo(() => {
    return concertMemories.filter(m => {
      if (selectedGroupFilter !== 'all' && m.groupName !== selectedGroupFilter) return false;
      if (selectedYearFilter !== 'all' && (!m.date || !m.date.startsWith(selectedYearFilter))) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = m.concertName ? m.concertName.toLowerCase().includes(query) : false;
        const matchesGroup = m.groupName ? m.groupName.toLowerCase().includes(query) : false;
        const matchesVenue = m.venue ? m.venue.toLowerCase().includes(query) : false;
        const matchesCity = m.city ? m.city.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesGroup && !matchesVenue && !matchesCity) return false;
      }
      return true;
    }).sort((a, b) => {
      const costA = 
        (Number(a.ticketPrice) || 0) + (Number(a.transportCost) || 0) +
        (Number(a.accommodationCost) || 0) + (Number(a.foodCost) || 0) +
        (Number(a.merchCost) || 0) + (Number(a.otherCost) || 0);

      const costB = 
        (Number(b.ticketPrice) || 0) + (Number(b.transportCost) || 0) +
        (Number(b.accommodationCost) || 0) + (Number(b.foodCost) || 0) +
        (Number(b.merchCost) || 0) + (Number(b.otherCost) || 0);

      if (sortBy === 'date_desc') return (b.date || '').localeCompare(a.date || '');
      if (sortBy === 'date_asc') return (a.date || '').localeCompare(b.date || '');
      if (sortBy === 'cost_desc') return costB - costA;
      if (sortBy === 'cost_asc') return costA - costB;
      if (sortBy === 'rating_desc') return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      return 0;
    });
  }, [concertMemories, selectedGroupFilter, selectedYearFilter, searchTerm, sortBy]);

  const openAddModal = () => {
    setEditingMemory(null);
    setConcertName('');
    setSelectedGroup(null);
    setShowGroupPicker(false);
    setDate(getTodayDateString());
    setVenue('');
    setCity('');
    setCountry('Taiwan');
    setSeatingSection('');
    setTicketPrice('');
    setTransportCost('');
    setAccommodationCost('');
    setFoodCost('');
    setMerchCost('');
    setOtherCost('');
    setRating(5);
    setFavoriteMemory('');
    setNotes('');
    setPhotos([]);
    setFormError('');
    setIsFormModalOpen(true);
  };

  const openEditModal = (mem) => {
    setEditingMemory(mem);
    setConcertName(mem.concertName || '');
    setSelectedGroup({ id: mem.groupId, name: mem.groupName });
    setShowGroupPicker(false);
    setDate(mem.date || getTodayDateString());
    setVenue(mem.venue || '');
    setCity(mem.city || '');
    setCountry(mem.country || '');
    setSeatingSection(mem.seatingSection || '');
    setTicketPrice(mem.ticketPrice !== undefined ? String(mem.ticketPrice) : '');
    setTransportCost(mem.transportCost !== undefined ? String(mem.transportCost) : '');
    setAccommodationCost(mem.accommodationCost !== undefined ? String(mem.accommodationCost) : '');
    setFoodCost(mem.foodCost !== undefined ? String(mem.foodCost) : '');
    setMerchCost(mem.merchCost !== undefined ? String(mem.merchCost) : '');
    setOtherCost(mem.otherCost !== undefined ? String(mem.otherCost) : '');
    setRating(Number(mem.rating) || 5);
    setFavoriteMemory(mem.favoriteMemory || '');
    setNotes(mem.notes || '');
    setPhotos(mem.photos || []);
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const compressed = [];
      for (const file of files) {
        const url = await compressImageFile(file);
        compressed.push(url);
      }
      setPhotos(prev => [...prev, ...compressed].slice(0, 6));
    } catch (err) {
      setFormError('Failed to upload image: ' + err.message);
    } finally {
      setIsUploading(false);
    }
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
      venue: venue.trim(),
      city: city.trim(),
      country: country.trim(),
      seatingSection: seatingSection.trim(),
      ticketPrice: Number(ticketPrice) || 0,
      transportCost: Number(transportCost) || 0,
      accommodationCost: Number(accommodationCost) || 0,
      foodCost: Number(foodCost) || 0,
      merchCost: Number(merchCost) || 0,
      otherCost: Number(otherCost) || 0,
      rating: Number(rating) || 5,
      favoriteMemory: favoriteMemory.trim(),
      notes: notes.trim(),
      photos
    };

    if (editingMemory) {
      updateConcertMemory(editingMemory.id, payload);
    } else {
      addConcertMemory(payload);
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="concert-memories-page">
      {/* Page Header */}
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
              Concert Memories
            </h1>
            <span style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-hover)',
              fontSize: '0.78rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              {concertMemories.length} Tours Attended
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            Your digital scrapbook of K-pop concerts, fan signs, barricade moments, and spending stats! 📸♡
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddModal}
        >
          <Plus size={16} />
          <span>Record Concert Memory</span>
        </button>
      </div>

      {/* Concert Statistics Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <DashboardCard
          icon={<Camera size={20} />}
          title="Concerts Attended"
          value={stats.totalConcerts}
          subtitle="Tours experienced live"
          badgeText="Memory Bank"
        />

        <DashboardCard
          icon={<DollarSign size={20} />}
          title="Total Concert Spending"
          value={formatCurrency(stats.totalSpent, profile.currency)}
          subtitle={`Avg: ${formatCurrency(stats.averageSpent, profile.currency)} / concert`}
          badgeText="All Expenses"
          color="var(--primary-hover)"
        />

        <DashboardCard
          icon={<Trophy size={20} />}
          title="Most Attended Artist"
          value={stats.topGroup ? stats.topGroup.name : 'None yet'}
          subtitle={stats.topGroup ? `${stats.topGroup.count} tours attended` : 'Record memories to see'}
          badgeText="Ult Group"
          color="#8B5CF6"
          bgColor="#F5F3FF"
        />

        <DashboardCard
          icon={<Star size={20} />}
          title="Favorite Concert"
          value={stats.favoriteConcert ? stats.favoriteConcert.groupName : 'None yet'}
          subtitle={stats.favoriteConcert ? `Rated ${stats.favoriteConcert.rating}/5 stars` : '5-star memories'}
          badgeText="Top Rated"
          color="#D97706"
          bgColor="#FEF3C7"
        />
      </div>

      {/* Yearly Attendance & Spending Chart if data exists */}
      {stats.yearlySpending.length > 0 && (
        <div className="delulu-card" style={{ marginBottom: '24px' }}>
          <div className="delulu-card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="delulu-card-title">Yearly Concert Expenditure</h3>
                <div className="delulu-card-subtitle">Spending trends across concert tour years</div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.yearlySpending} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(val) => formatCurrency(val, profile.currency)} />
                <Tooltip formatter={(val) => formatCurrency(val, profile.currency)} />
                <Bar dataKey="total" fill="var(--primary)" radius={[6, 6, 0, 0]} name="Total Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px' }}
            placeholder="Search by tour, artist, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Group Filter */}
        <select
          className="form-select"
          value={selectedGroupFilter}
          onChange={(e) => setSelectedGroupFilter(e.target.value)}
        >
          <option value="all">All Groups</option>
          {availableGroups.map((grp) => (
            <option key={grp} value={grp}>{grp}</option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          className="form-select"
          value={selectedYearFilter}
          onChange={(e) => setSelectedYearFilter(e.target.value)}
        >
          <option value="all">All Years</option>
          {availableYears.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date_desc">Date: Newest First</option>
          <option value="date_asc">Date: Oldest First</option>
          <option value="cost_desc">Spending: Highest First</option>
          <option value="cost_asc">Spending: Lowest First</option>
          <option value="rating_desc">Highest Rated</option>
        </select>
      </div>

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="empty-state delulu-card">
          <div className="empty-state-emoji">📸</div>
          <div className="empty-state-title">No concert memories found</div>
          <div className="empty-state-desc">
            {searchTerm || selectedGroupFilter !== 'all' || selectedYearFilter !== 'all'
              ? 'Try clearing your search filters to view your concert log!'
              : 'Record your first attended concert with venue details, ticket price, and sweet memories!'}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={openAddModal}
          >
            <Plus size={16} /> Record Attended Concert
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {filteredMemories.map((mem) => (
            <ConcertCard
              key={mem.id}
              type="memory"
              concert={mem}
              currencyCode={profile.currency}
              onEdit={openEditModal}
              onDelete={deleteConcertMemory}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Concert Memory Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingMemory ? '✏️ Edit Concert Memory' : '📸 Record Attended Concert'}
        maxWidth="640px"
      >
        <form onSubmit={handleFormSubmit}>
          {formError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '14px', fontWeight: 700 }}>
              {formError}
            </div>
          )}

          {/* Tour Name */}
          <div className="form-group">
            <label className="form-label">Concert or Tour Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. IVE THE 1ST WORLD TOUR <SHOW WHAT I HAVE> in Taipei"
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

          {/* Date, Venue, City, Country */}
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
              <label className="form-label">Venue</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Linkou Arena"
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

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-input"
                placeholder="Taiwan"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          {/* Seating Section and Star Rating */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Seating Section / Tier</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. VIP Soundcheck Section A"
                value={seatingSection}
                onChange={(e) => setSeatingSection(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Concert Rating</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '6px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Star
                      size={22}
                      fill={star <= rating ? '#F59E0B' : 'transparent'}
                      color={star <= rating ? '#F59E0B' : '#D1D5DB'}
                    />
                  </button>
                ))}
                <span style={{ fontWeight: 800, color: '#B45309', marginLeft: '6px' }}>{rating}/5</span>
              </div>
            </div>
          </div>

          {/* Itemized Spending */}
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', margin: '10px 0 6px' }}>
            Concert Expenses ({profile.currency || 'TWD'})
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Ticket</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Transport</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={transportCost}
                onChange={(e) => setTransportCost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Hotel / Stay</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={accommodationCost}
                onChange={(e) => setAccommodationCost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Food & Drinks</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={foodCost}
                onChange={(e) => setFoodCost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Merchandise</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={merchCost}
                onChange={(e) => setMerchCost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Other</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                min="0"
                value={otherCost}
                onChange={(e) => setOtherCost(e.target.value)}
              />
            </div>
          </div>

          {/* Favorite Memory Quote */}
          <div className="form-group">
            <label className="form-label">Favorite Concert Memory ♡</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. Bias blew a kiss during the encore song, confetti explosion during the finale!"
              value={favoriteMemory}
              onChange={(e) => setFavoriteMemory(e.target.value)}
              rows={2}
            />
          </div>

          {/* Photos */}
          <div className="form-group">
            <label className="form-label">
              <ImagePlus size={15} color="var(--primary)" />
              <span>Concert Photos (Max 6 compressed)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="form-input"
              style={{ padding: '6px' }}
              disabled={isUploading}
            />
            {isUploading && (
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-hover)', marginTop: '4px' }}>
                Optimizing photos for safe local storage...
              </span>
            )}
            {photos.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {photos.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img
                      src={url}
                      alt={`Photo ${idx + 1}`}
                      style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => setPhotos(prev => prev.filter((_, i) => i !== idx))}
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>{editingMemory ? 'Update Memory' : 'Save Memory'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
