import React, { useState } from 'react';
import { getMonthGrid, formatMonthDisplay, formatDisplayDate } from '../utils/dateHelpers';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Plus, Ticket, Clock } from 'lucide-react';

export default function ConcertCalendar({
  concerts = [],
  onSelectDate,
  onSelectConcert
}) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'agenda'

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonthIndex(today.getMonth());
  };

  const currentYearMonthStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;
  const gridDays = getMonthGrid(currentYear, currentMonthIndex);

  // Group concerts by date string
  const concertsByDate = {};
  const ticketingByDate = {};

  concerts.forEach((c) => {
    if (c.date) {
      if (!concertsByDate[c.date]) concertsByDate[c.date] = [];
      concertsByDate[c.date].push(c);
    }
    if (c.ticketingDate) {
      if (!ticketingByDate[c.ticketingDate]) ticketingByDate[c.ticketingDate] = [];
      ticketingByDate[c.ticketingDate].push(c);
    }
  });

  return (
    <div className="delulu-card concert-calendar-card" style={{ marginBottom: '24px' }}>
      {/* Calendar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {formatMonthDisplay(currentYearMonthStr)}
          </h3>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              className="btn btn-outline btn-icon"
              style={{ width: '32px', height: '32px' }}
              onClick={handlePrevMonth}
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              onClick={handleToday}
            >
              Today
            </button>
            <button
              type="button"
              className="btn btn-outline btn-icon"
              style={{ width: '32px', height: '32px' }}
              onClick={handleNextMonth}
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              background: viewMode === 'grid' ? 'var(--bg-card)' : 'transparent',
              color: viewMode === 'grid' ? 'var(--primary-hover)' : 'var(--text-muted)',
              border: 'none',
              boxShadow: viewMode === 'grid' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
            onClick={() => setViewMode('grid')}
          >
            <CalendarIcon size={14} />
            <span>Month Grid</span>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{
              background: viewMode === 'agenda' ? 'var(--bg-card)' : 'transparent',
              color: viewMode === 'agenda' ? 'var(--primary-hover)' : 'var(--text-muted)',
              border: 'none',
              boxShadow: viewMode === 'agenda' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
            }}
            onClick={() => setViewMode('agenda')}
          >
            <List size={14} />
            <span>Agenda View</span>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div>
          {/* Day Names Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            marginBottom: '8px'
          }}>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Cells */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px'
          }}>
            {gridDays.map((cell, idx) => {
              const dayConcerts = concertsByDate[cell.dateStr] || [];
              const dayTicketing = ticketingByDate[cell.dateStr] || [];
              const hasEvents = dayConcerts.length > 0 || dayTicketing.length > 0;

              return (
                <div
                  key={idx}
                  onClick={() => onSelectDate(cell.dateStr)}
                  style={{
                    minHeight: '80px',
                    padding: '6px',
                    borderRadius: 'var(--radius-md)',
                    background: cell.isCurrentMonth ? (hasEvents ? 'var(--primary-ultralight)' : 'var(--bg-card)') : 'var(--bg-main)',
                    border: '1.5px solid',
                    borderColor: hasEvents ? 'var(--primary-light)' : 'var(--border-light)',
                    opacity: cell.isCurrentMonth ? 1 : 0.45,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = hasEvents ? 'var(--primary-light)' : 'var(--border-light)';
                  }}
                  title={`Click to add concert on ${cell.dateStr}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: cell.isCurrentMonth ? 'var(--text-main)' : 'var(--text-muted)'
                    }}>
                      {cell.dayNumber}
                    </span>
                    {hasEvents && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                    )}
                  </div>

                  {/* Badges for concerts & ticketing */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                    {dayTicketing.map((c) => (
                      <div
                        key={`ticketing_${c.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectConcert(c);
                        }}
                        style={{
                          background: '#FEF3C7',
                          color: '#92400E',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 4px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={`Ticketing: ${c.concertName}`}
                      >
                        🎟️ Ticketing: {c.groupName || c.concertName}
                      </div>
                    ))}

                    {dayConcerts.map((c) => (
                      <div
                        key={`concert_${c.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectConcert(c);
                        }}
                        style={{
                          background: 'var(--primary)',
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 4px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                        title={c.concertName}
                      >
                        🎤 {c.groupName || c.concertName}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Agenda / Timeline View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {concerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No concerts planned yet! Click any date or the Add button above to schedule one.
            </div>
          ) : (
            concerts
              .slice()
              .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectConcert(c)}
                  style={{
                    background: 'var(--bg-main)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: 'var(--primary-light)',
                      color: 'var(--primary-hover)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      lineHeight: 1.1
                    }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        {c.date ? new Date(c.date).toLocaleDateString('en-US', { month: 'short' }) : 'TBA'}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>
                        {c.date ? c.date.split('-')[2] : '--'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {c.concertName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {c.groupName} • {c.venue}, {c.city}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: c.ticketStatus === 'Ticket Purchased' ? '#ECFDF5' : '#EFF6FF',
                    color: c.ticketStatus === 'Ticket Purchased' ? '#065F46' : '#1E40AF'
                  }}>
                    {c.ticketStatus || 'Planned'}
                  </span>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}
