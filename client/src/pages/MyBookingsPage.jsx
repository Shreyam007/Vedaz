import { useState } from 'react';
import useBookings from '../hooks/useBookings';
import { Search, CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';
import Badge from '../components/Badge';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emailToSearch, setEmailToSearch] = useState('');
  
  const { data: bookings, isLoading, isError } = useBookings(emailToSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailToSearch(emailInput.trim());
    }
  };

  const getStatusBorder = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'border-l-teal-500';
      case 'completed': return 'border-l-indigo-500';
      default: return 'border-l-amber-500';
    }
  };

  const getDaysDiff = (dateStr) => {
    const target = new Date(dateStr);
    const today = new Date();
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffDays === 0) return 'Today';
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-slide-up">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent mb-4 tracking-tight">My Bookings</h1>
        <p className="text-slate-400 max-w-lg mx-auto text-lg">Enter the email address you used during booking to view your upcoming and past sessions.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mb-16 group">
        <div className="glass ring-1 ring-white/[0.08] focus-within:ring-indigo-500/50 focus-within:shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-all duration-300 rounded-2xl flex items-center p-1.5">
          <Search className="w-5 h-5 text-slate-400 ml-3 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="email" 
            required
            placeholder="Enter your email address..."
            className="w-full bg-transparent border-none outline-none text-white px-4 py-3.5 placeholder:text-slate-500"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <Loader />}
      
      {isError && (
        <div className="glass border-red-500/30 bg-red-500/10 text-center text-red-400 p-6 rounded-2xl max-w-xl mx-auto animate-shake">
          Failed to fetch bookings. Please check your email and try again.
        </div>
      )}

      {bookings && bookings.length === 0 && (
        <div className="text-center glass p-16 rounded-3xl max-w-2xl mx-auto mt-8 animate-fade-slide-up flex flex-col items-center border border-white/[0.04]">
          <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
            <CalendarDays className="w-12 h-12 text-indigo-400 opacity-80" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No bookings found</h3>
          <p className="text-slate-400 mb-8 max-w-sm">We couldn't find any bookings associated with <strong className="text-white">{emailToSearch}</strong>.</p>
          <Link 
            to="/experts" 
            className="px-8 py-3.5 bg-white/[0.04] text-white rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.16] font-bold transition-all flex items-center gap-2 group"
          >
            Search for experts
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {bookings.map((booking, index) => (
            <div 
              key={booking._id} 
              className={`glass p-6 rounded-2xl border-l-[4px] hover:-translate-y-1 transition-all duration-300 animate-stagger-in opacity-0 flex flex-col justify-between ${getStatusBorder(booking.status)}`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={booking.expertId.profileImage} 
                    alt={booking.expertId.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#0A0F1E] bg-[#0A0F1E]"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-extrabold text-lg text-white">{booking.expertId.name}</h3>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/[0.04] text-slate-300 rounded border border-white/[0.08]">
                      {booking.expertId.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/[0.04]">
                  <div className="text-slate-400 text-sm flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium text-white">{formatDate(booking.date)}</span>
                  </div>
                  <div className="text-slate-400 text-sm flex items-center gap-3">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <span className="font-medium text-white">{booking.timeSlot}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <Badge text={booking.status} />
                <span className="text-sm font-semibold text-slate-500">
                  {getDaysDiff(booking.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
