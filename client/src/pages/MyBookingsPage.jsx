import { useState } from 'react';
import useBookings from '../hooks/useBookings';
import { Search, CalendarDays } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Pending': default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-primary">My Bookings</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Enter the email address you used during booking to view your upcoming and past sessions.</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="email" 
          required
          placeholder="Enter your email..."
          className="w-full pl-12 pr-24 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none shadow-sm"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Search
        </button>
      </form>

      {isLoading && <Loader />}
      
      {isError && (
        <div className="text-center text-red-500 bg-red-50 p-4 rounded-xl">
          Failed to fetch bookings. Please check your email and try again.
        </div>
      )}

      {bookings && bookings.length === 0 && (
        <div className="text-center bg-white p-12 rounded-3xl border border-gray-100 shadow-sm mt-8 fade-in">
          <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-500">We couldn't find any bookings associated with <strong>{emailToSearch}</strong>.</p>
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="space-y-4 mt-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-6 fade-in">
              <img 
                src={booking.expertId.profileImage} 
                alt={booking.expertId.name} 
                className="w-16 h-16 rounded-full object-cover border border-gray-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-primary">{booking.expertId.name}</h3>
                  <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {booking.expertId.category}
                  </span>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(booking.date)} at {booking.timeSlot}
                </div>
              </div>
              
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <span className="text-xs text-gray-400">Booked on {new Date(booking.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
