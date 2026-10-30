import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';
import { formatDisplayDate, calculateCountdown } from '../utils/dateHelpers';
import { calculateSingleConcertTotal, calculateUpcomingEstimatedTotal } from '../utils/calculations';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Clock, 
  Star, 
  Heart, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Sparkles,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import Modal from './Modal';

export default function ConcertCard({
  type = 'upcoming', // 'upcoming' or 'memory'
  concert,
  currencyCode = 'TWD',
  onEdit,
  onDelete,
  onMarkAttended, // For converting upcoming to memory
  linkedSavingsGoal = null
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewPhotoModalUrl, setViewPhotoModalUrl] = useState(null);

  const isUpcoming = type === 'upcoming';

  // Countdowns
  const eventCountdown = isUpcoming ? calculateCountdown(concert.date) : null;
  const ticketingCountdown = isUpcoming && concert.ticketingDate ? calculateCountdown(concert.ticketingDate) : null;

  // Costs
  const totalCost = isUpcoming
    ? calculateUpcomingEstimatedTotal(concert)
    : calculateSingleConcertTotal(concert);

  // Status badge colors for upcoming
  const getTicketStatusBadge = (status) => {
    switch (status) {
      case 'Ticket Purchased':
        return { text: 'Ticket Purchased ✨', bg: '#ECFDF5', color: '#065F46', border: '#A7F3D0' };
      case 'Planning to Buy':
        return { text: 'Planning to Buy 🎫', bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      case 'Sold Out':
        return { text: 'Sold Out 😭', bg: '#FEF2F2', color: '#991B1B', border: '#FECACA' };
      default:
        return { text: 'Not Available Yet ⏳', bg: '#F3F4F6', color: '#4B5563', border: '#E5E7EB' };
    }
  };

  const ticketBadge = isUpcoming ? getTicketStatusBadge(concert.ticketStatus) : null;

  return (
    <div className="delulu-card concert-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.2 }}>
                {concert.concertName}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-hover)', marginTop: '2px' }}>
              {concert.groupName || 'K-pop Artist'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              className="btn btn-outline btn-icon"
              style={{ width: '30px', height: '30px' }}
              onClick={() => onEdit(concert)}
              title="Edit details"
            >
              <Edit3 size={13} />
            </button>
            <button
              type="button"
              className="btn btn-danger btn-icon"
              style={{ width: '30px', height: '30px' }}
              onClick={() => setIsDeleteModalOpen(true)}
              title="Delete concert"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Dynamic Countdown Banner for Upcoming */}
        {isUpcoming && eventCountdown && (
          <div style={{
            background: eventCountdown.isToday ? 'linear-gradient(135deg, #FF7597, #FF8DA7)' : eventCountdown.isPast ? '#F3F4F6' : 'var(--primary-light)',
            color: eventCountdown.isToday ? 'white' : eventCountdown.isPast ? '#6B7280' : 'var(--primary-hover)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={15} />
              <span>
                {eventCountdown.isToday 
                  ? 'CONCERT DAY IS HERE! Your concert era has begun! 🎉'
                  : eventCountdown.isPast 
                  ? 'Concert passed (mark as attended!)'
                  : `${eventCountdown.days} days until you see your bias! ♡`}
              </span>
            </div>
            {ticketBadge && (
              <span style={{
                background: ticketBadge.bg,
                color: ticketBadge.color,
                border: `1px solid ${ticketBadge.border}`,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem'
              }}>
                {ticketBadge.text}
              </span>
            )}
          </div>
        )}

        {/* Star Rating for Memory */}
        {!isUpcoming && concert.rating > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill={star <= concert.rating ? '#F59E0B' : 'transparent'}
                color={star <= concert.rating ? '#F59E0B' : '#D1D5DB'}
              />
            ))}
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B45309', marginLeft: '4px' }}>
              {concert.rating}/5 Rating
            </span>
          </div>
        )}

        {/* Date, Time, Venue, City */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="var(--primary)" />
            <span>{formatDisplayDate(concert.date)} {concert.time && `• ${concert.time}`}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="var(--primary)" />
            <span>{concert.venue || 'Venue TBA'}{concert.city ? `, ${concert.city}` : ''}{concert.country ? ` (${concert.country})` : ''}</span>
          </div>
          {!isUpcoming && concert.seatingSection && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Ticket size={14} color="var(--primary)" />
              <span>Section: <strong>{concert.seatingSection}</strong></span>
            </div>
          )}
          {isUpcoming && concert.ticketingDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontWeight: 700 }}>
              <Clock size={14} />
              <span>Ticketing opens: {formatDisplayDate(concert.ticketingDate)} ({ticketingCountdown?.text})</span>
            </div>
          )}
        </div>

        {/* Favorite Memory Quote (Attended) */}
        {!isUpcoming && concert.favoriteMemory && (
          <div style={{
            background: 'var(--primary-ultralight)',
            borderLeft: '3px solid var(--primary)',
            padding: '8px 12px',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '0.82rem',
            fontStyle: 'italic',
            color: 'var(--text-main)',
            marginBottom: '14px'
          }}>
            "{concert.favoriteMemory}"
          </div>
        )}

        {/* Photo Gallery Thumbnails (Attended) */}
        {!isUpcoming && concert.photos && concert.photos.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Memories Gallery ({concert.photos.length} photos)
            </div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {concert.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Concert photo ${idx + 1}`}
                  onClick={() => setViewPhotoModalUrl(photo)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '1.5px solid var(--border-color)',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cost Breakdown Summary Card */}
        <div style={{
          background: 'var(--bg-main)',
          padding: '12px 14px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {isUpcoming ? 'Estimated Total Budget' : 'Actual Concert Spending'}
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary-hover)' }}>
              {formatCurrency(totalCost, currencyCode)}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <div>Ticket: <strong>{formatCurrency(isUpcoming ? concert.estimatedTicket : concert.ticketPrice, currencyCode)}</strong></div>
            <div>Travel: <strong>{formatCurrency(isUpcoming ? concert.estimatedTransport : concert.transportCost, currencyCode)}</strong></div>
            <div>Hotel: <strong>{formatCurrency(isUpcoming ? concert.estimatedAccommodation : concert.accommodationCost, currencyCode)}</strong></div>
            <div>Food: <strong>{formatCurrency(isUpcoming ? concert.estimatedFood : concert.foodCost, currencyCode)}</strong></div>
            <div>Merch: <strong>{formatCurrency(isUpcoming ? concert.estimatedMerch : concert.merchCost, currencyCode)}</strong></div>
            <div>Other: <strong>{formatCurrency(isUpcoming ? concert.estimatedOther : concert.otherCost, currencyCode)}</strong></div>
          </div>
        </div>

        {/* Linked Savings Goal Progress for Upcoming */}
        {isUpcoming && linkedSavingsGoal && (
          <div style={{
            background: 'var(--primary-ultralight)',
            border: '1px solid var(--border-light)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
              <span>Linked Savings: {linkedSavingsGoal.name}</span>
              <span style={{ color: 'var(--primary-hover)' }}>
                {formatCurrency(linkedSavingsGoal.currentAmount, currencyCode)} / {formatCurrency(linkedSavingsGoal.targetAmount, currencyCode)}
              </span>
            </div>
            <div className="progress-container" style={{ height: '8px' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${Math.min(100, Math.round((linkedSavingsGoal.currentAmount / (linkedSavingsGoal.targetAmount || 1)) * 100))}%`,
                  backgroundColor: 'var(--primary)'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {isUpcoming && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onMarkAttended(concert)}
          >
            <CheckCircle size={14} />
            <span>Mark as Attended ✨</span>
          </button>
        )}

        {isUpcoming && concert.ticketingUrl && (
          <a
            href={concert.ticketingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <ExternalLink size={13} />
            <span>Buy Tickets</span>
          </a>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Concert?"
        maxWidth="420px"
        footer={(
          <>
            <button type="button" className="btn btn-outline" onClick={() => setIsDeleteModalOpen(false)}>
              Keep Concert
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onDelete(concert.id);
                setIsDeleteModalOpen(false);
              }}
            >
              Yes, Delete
            </button>
          </>
        )}
      >
        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
          Are you sure you want to delete <strong>{concert.concertName}</strong>? This action cannot be undone.
        </p>
      </Modal>

      {/* Photo Lightbox Modal */}
      <Modal
        isOpen={Boolean(viewPhotoModalUrl)}
        onClose={() => setViewPhotoModalUrl(null)}
        title="Concert Memory Photo ♡"
        maxWidth="680px"
      >
        {viewPhotoModalUrl && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={viewPhotoModalUrl}
              alt="Concert memory enlarged"
              style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: 'var(--radius-md)', objectFit: 'contain' }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
