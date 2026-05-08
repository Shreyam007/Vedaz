import { useNavigate } from 'react-router-dom';
import { groupSlotsByDate, formatDate } from '../utils/formatDate';

const SlotGrid = ({ slots, expertId }) => {
  const navigate = useNavigate();
  const groupedSlots = groupSlotsByDate(slots);
  
  const handleSlotClick = (date, slot) => {
    if (slot.isBooked) return;
    navigate(`/book/${expertId}?date=${encodeURIComponent(date)}&slot=${encodeURIComponent(slot.time)}`);
  };

  return (
    <div className="space-y-6">
      {Object.keys(groupedSlots).length === 0 ? (
        <p className="text-gray-500 italic">No available slots at the moment.</p>
      ) : (
        Object.entries(groupedSlots).map(([date, dailySlots]) => (
          <div key={date} className="fade-in">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {formatDate(date)}
            </h4>
            <div className="flex flex-wrap gap-3">
              {dailySlots.map((slot, index) => (
                <button
                  key={index}
                  disabled={slot.isBooked}
                  onClick={() => handleSlotClick(date, slot)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${slot.isBooked 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through opacity-60' 
                      : 'bg-accent/10 text-accent hover:bg-accent hover:text-white hover:shadow-md hover:-translate-y-0.5'}
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SlotGrid;
