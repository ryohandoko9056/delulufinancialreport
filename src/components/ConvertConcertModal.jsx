import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { compressImageFile } from '../utils/storage';
import { Star, ImagePlus, Sparkles, AlertCircle, X } from 'lucide-react';
import Modal from './Modal';

export default function ConvertConcertModal({
  isOpen,
  onClose,
  concert,
  currencyCode = 'TWD',
  onConfirmConversion
}) {
  if (!concert) return null;

  const [ticketPrice, setTicketPrice] = useState(concert.estimatedTicket || '');
  const [transportCost, setTransportCost] = useState(concert.estimatedTransport || '');
  const [accommodationCost, setAccommodationCost] = useState(concert.estimatedAccommodation || '');
  const [foodCost, setFoodCost] = useState(concert.estimatedFood || '');
  const [merchCost, setMerchCost] = useState(concert.estimatedMerch || '');
  const [otherCost, setOtherCost] = useState(concert.estimatedOther || '');
  const [seatingSection, setSeatingSection] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [notes, setNotes] = useState(concert.notes || '');
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const originalEstimate = 
    (Number(concert.estimatedTicket) || 0) +
    (Number(concert.estimatedTransport) || 0) +
    (Number(concert.estimatedAccommodation) || 0) +
    (Number(concert.estimatedFood) || 0) +
    (Number(concert.estimatedMerch) || 0) +
    (Number(concert.estimatedOther) || 0);

  const actualTotal =
    (Number(ticketPrice) || 0) +
    (Number(transportCost) || 0) +
    (Number(accommodationCost) || 0) +
    (Number(foodCost) || 0) +
    (Number(merchCost) || 0) +
    (Number(otherCost) || 0);

  const difference = actualTotal - originalEstimate;

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const compressedUrls = [];
      for (const file of files) {
        if (file.size > 15 * 1024 * 1024) {
          throw new Error('Image file is too large. Max 15MB before compression.');
        }
        const dataUrl = await compressImageFile(file);
        compressedUrls.push(dataUrl);
      }
      setPhotos((prev) => [...prev, ...compressedUrls].slice(0, 6)); // Keep max 6 compressed photos
    } catch (err) {
      setUploadError(err.message || 'Failed to process images');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onConfirmConversion(concert.id, {
      concertName: concert.concertName,
      groupId: concert.groupId,
      groupName: concert.groupName,
      date: concert.date,
      venue: concert.venue,
      city: concert.city,
      country: concert.country,
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
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎉 Mark Concert as Attended!"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'var(--primary-light)',
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '18px'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>
            {concert.concertName} ({concert.groupName})
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            📅 {concert.date} • 📍 {concert.venue}, {concert.city}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', marginTop: '4px', fontWeight: 700 }}>
            Original Planned Budget: {formatCurrency(originalEstimate, currencyCode)}
          </div>
        </div>

        {/* Actual Expenses Breakdown */}
        <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--text-main)' }}>
          Actual Spending Breakdown ({currencyCode})
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Ticket Price</label>
            <input
              type="number"
              className="form-input"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Transport</label>
            <input
              type="number"
              className="form-input"
              value={transportCost}
              onChange={(e) => setTransportCost(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Hotel / Stay</label>
            <input
              type="number"
              className="form-input"
              value={accommodationCost}
              onChange={(e) => setAccommodationCost(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Food & Drinks</label>
            <input
              type="number"
              className="form-input"
              value={foodCost}
              onChange={(e) => setFoodCost(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Merchandise</label>
            <input
              type="number"
              className="form-input"
              value={merchCost}
              onChange={(e) => setMerchCost(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem' }}>Other</label>
            <input
              type="number"
              className="form-input"
              value={otherCost}
              onChange={(e) => setOtherCost(e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Live Comparison Box */}
        <div style={{
          background: 'var(--bg-main)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Actual Total: </span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{formatCurrency(actualTotal, currencyCode)}</strong>
          </div>
          <div>
            <span style={{
              fontWeight: 800,
              color: difference > 0 ? '#DC2626' : '#059669',
              background: difference > 0 ? '#FEE2E2' : '#ECFDF5',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {difference > 0 ? `+${formatCurrency(difference, currencyCode)} over plan` : `${formatCurrency(Math.abs(difference), currencyCode)} under budget`}
            </span>
          </div>
        </div>

        {/* Seating Section & Star Rating */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label className="form-label">Seating Section / Tier</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. VIP Soundcheck Section A2, Row 4"
              value={seatingSection}
              onChange={(e) => setSeatingSection(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Experience Rating (1–5 Stars)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    size={24}
                    fill={star <= rating ? '#F59E0B' : 'transparent'}
                    color={star <= rating ? '#F59E0B' : '#D1D5DB'}
                  />
                </button>
              ))}
              <span style={{ fontWeight: 800, color: '#B45309', marginLeft: '6px' }}>{rating}/5</span>
            </div>
          </div>
        </div>

        {/* Favorite Memory */}
        <div className="form-group">
          <label className="form-label">Favorite Concert Memory ♡</label>
          <textarea
            className="form-textarea"
            placeholder="e.g. Bias waved directly at me during the encore, acoustic stage gave me goosebumps!"
            value={favoriteMemory}
            onChange={(e) => setFavoriteMemory(e.target.value)}
            rows={2}
          />
        </div>

        {/* Photo Uploads */}
        <div className="form-group">
          <label className="form-label">
            <ImagePlus size={15} color="var(--primary)" />
            <span>Upload Concert Photos / Ticket Stub (Max 6)</span>
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
              Compressing photos responsibly for browser storage...
            </span>
          )}
          {uploadError && (
            <span style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '4px' }}>
              {uploadError}
            </span>
          )}

          {photos.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {photos.map((url, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <img
                    src={url}
                    alt={`Preview ${idx + 1}`}
                    style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
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

        {/* Confirmation buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <Sparkles size={16} />
            <span>Transfer to Memories</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
