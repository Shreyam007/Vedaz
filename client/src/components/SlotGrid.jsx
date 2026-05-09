import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupSlotsByDate, formatDate } from '../utils/formatDate';

const SlotGrid = ({ slots, expertId }) => {
  const navigate = useNavigate();
  const groupedSlots = groupSlotsByDate(slots);
  const availableDates = Object.keys(groupedSlots);
  const [activeDate, setActiveDate] = useState(availableDates[0] || null);
  const [hoveredSlot, setHoveredSlot] = useState(null);
  
  const handleSlotClick = (date, slot) => {
    if (slot.isBooked) return;
    navigate(`/book/${expertId}?date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slot.time)}`);
  };

  if (availableDates.length === 0) {
    return <p style={{ color: '#64748B', fontStyle: 'italic' }}>No available slots at the moment.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Date Tabs (Horizontal Scrollable) */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '4px' }}>
        {availableDates.map(date => (
          <button
            key={date}
            onClick={() => setActiveDate(date)}
            style={activeDate === date ? {
              padding: '10px 18px', borderRadius: '12px', whiteSpace: 'nowrap', cursor: 'pointer',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: '#fff', fontWeight: 600, fontSize: '13px', border: 'none',
              boxShadow: '0 4px 16px rgba(99,102,241,0.4)'
            } : {
              padding: '10px 18px', borderRadius: '12px', whiteSpace: 'nowrap', cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94A3B8', fontWeight: 500, fontSize: '13px'
            }}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      {/* Slots Grid for Active Date */}
      {activeDate && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }} className="animate-fade">
          {groupedSlots[activeDate].map((slot, index) => {
            const isHovered = hoveredSlot === index;
            return (
              <button
                key={index}
                disabled={slot.isBooked}
                onClick={() => handleSlotClick(activeDate, slot)}
                onMouseEnter={() => setHoveredSlot(index)}
                onMouseLeave={() => setHoveredSlot(null)}
                style={slot.isBooked ? {
                  padding: '12px 8px', borderRadius: '12px', textAlign: 'center',
                  background: 'rgba(30,41,59,0.6)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: '#475569', fontSize: '13px', fontWeight: 600,
                  cursor: 'not-allowed', textDecoration: 'line-through',
                  position: 'relative'
                } : {
                  padding: '12px 8px', borderRadius: '12px', textAlign: 'center',
                  background: isHovered ? 'rgba(13,148,136,0.22)' : 'rgba(13,148,136,0.10)',
                  border: '1px solid rgba(13,148,136,0.35)',
                  color: '#2DD4BF', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  position: 'relative',
                  boxShadow: isHovered ? '0 0 20px rgba(13,148,136,0.3)' : 'none',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                {slot.time}
                {slot.isBooked && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-4px',
                    background: '#374151', color: '#9CA3AF',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em',
                    padding: '2px 5px', borderRadius: '4px',
                    textDecoration: 'none'
                  }}>
                    TAKEN
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default SlotGrid;
