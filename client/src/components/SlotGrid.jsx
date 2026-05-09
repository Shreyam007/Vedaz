import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupSlotsByDate, formatDate } from '../utils/formatDate';

const SlotGrid = ({ slots, expertId }) => {
  const navigate = useNavigate();
  const groupedSlots = groupSlotsByDate(slots);
  const availableDates = Object.keys(groupedSlots);
  const [activeDate, setActiveDate] = useState(availableDates[0] || null);
  
  const handleSlotClick = (date, slot) => {
    if (slot.isBooked) return;
    navigate(`/book/${expertId}?date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slot.time)}`);
  };

  if (availableDates.length === 0) {
    return <p className="text-slate-500 italic">No available slots at the moment.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Date Tabs (Horizontal Scrollable) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {availableDates.map(date => (
          <button
            key={date}
            onClick={() => setActiveDate(date)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeDate === date 
                ? 'bg-indigo-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)]'
                : 'bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white'
            }`}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      {/* Slots Grid for Active Date */}
      {activeDate && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-slide-up" key={activeDate}>
          {groupedSlots[activeDate].map((slot, index) => (
            <button
              key={index}
              disabled={slot.isBooked}
              onClick={() => handleSlotClick(activeDate, slot)}
              className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                slot.isBooked 
                  ? 'bg-slate-800/50 border border-white/[0.04] text-slate-600 line-through cursor-not-allowed'
                  : 'bg-teal-500/10 border border-teal-500/30 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/60 hover:shadow-[0_0_12px_rgba(13,148,136,0.3)] active:scale-95 cursor-pointer'
              }`}
            >
              {slot.time}
              {slot.isBooked && (
                <span className="absolute -top-2 -right-2 bg-slate-700 text-slate-400 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm z-10">
                  Taken
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlotGrid;
