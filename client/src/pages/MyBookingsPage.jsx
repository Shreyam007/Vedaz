import React, { useState, useEffect } from 'react';
import useBookings from '../hooks/useBookings';
import { Search, CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const MyBookingsPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emailToSearch, setEmailToSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: bookings, isLoading, isError } = useBookings(emailToSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailToSearch(emailInput.trim());
    }
  };

  const getStatusBorder = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return '#10B981';
      case 'completed': return '#6366F1';
      default: return '#F59E0B';
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

  const StatusBadge = ({ status }) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return (
        <span style={{ 
          background: 'rgba(245,158,11,0.12)', color: '#FCD34D',
          border: '1px solid rgba(245,158,11,0.25)', borderRadius: '999px',
          padding: '4px 12px', fontSize: '12px', fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: '6px' 
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', animation: 'pulse-glow 1.5s infinite' }} />
          {status}
        </span>
      );
    }
    if (statusLower === 'confirmed') {
      return (
        <span style={{ 
          background: 'rgba(16,185,129,0.12)', color: '#34D399',
          border: '1px solid rgba(16,185,129,0.25)', borderRadius: '999px',
          padding: '4px 12px', fontSize: '12px', fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: '6px' 
        }}>
          {status}
        </span>
      );
    }
    return (
      <span style={{ 
        background: 'rgba(99,102,241,0.12)', color: '#818CF8',
        border: '1px solid rgba(99,102,241,0.25)', borderRadius: '999px',
        padding: '4px 12px', fontSize: '12px', fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', gap: '6px' 
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', paddingTop: '88px', paddingBottom: '60px', paddingLeft: '24px', paddingRight: '24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#F1F5F9', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '8px' }}>
            My Bookings
          </h1>
          <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '32px' }}>
            Enter the email address you used during booking to view your upcoming and past sessions.
          </p>
        </div>

        <form onSubmit={handleSearch} style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '24px',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          marginBottom: '32px',
          display: 'flex', gap: '12px', alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          
          <div style={{ flex: 1, position: 'relative', width: '100%' }}>
            <input 
              type="email" 
              required
              placeholder="Enter your email address..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                width: '100%', padding: '14px 16px',
                background: isFocused ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
                border: isFocused ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.10)',
                borderRadius: '14px', color: '#F1F5F9',
                fontSize: '15px', fontFamily: 'inherit', outline: 'none',
                transition: 'all 0.2s ease',
                boxShadow: isFocused ? '0 0 0 4px rgba(99,102,241,0.12)' : 'none'
              }}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            style={{
              padding: '14px 28px', borderRadius: '14px', border: 'none',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              color: '#fff', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(99,102,241,0.35)', fontFamily: 'inherit',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            Search
          </button>
        </form>

        {isLoading && <Loader />}
        
        {isError && (
          <div className="animate-shake" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '16px', borderRadius: '16px', textAlign: 'center', marginBottom: '32px' }}>
            Failed to fetch bookings. Please check your email and try again.
          </div>
        )}

        {bookings && bookings.length === 0 && (
          <div className="animate-fade" style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '64px 24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <CalendarDays size={40} color="#818CF8" style={{ opacity: 0.8 }} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>No bookings found</h3>
            <p style={{ color: '#94A3B8', marginBottom: '32px', maxWidth: '400px' }}>We couldn't find any bookings associated with <strong style={{ color: '#fff' }}>{emailToSearch}</strong>.</p>
            <Link 
              to="/experts" 
              style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.04)', color: '#fff', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease' }}
            >
              Search for experts <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {bookings && bookings.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(420px, 1fr))', gap: '16px' }}>
            {bookings.map((booking, index) => (
              <BookingCard key={booking._id} booking={booking} index={index} getStatusBorder={getStatusBorder} getDaysDiff={getDaysDiff} StatusBadge={StatusBadge} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, index, getStatusBorder, getDaysDiff, StatusBadge }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="animate-stagger"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `4px solid ${getStatusBorder(booking.status)}`,
        borderRadius: '20px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', transition: 'all 0.25s ease',
        animationDelay: `${index * 100}ms`, animationFillMode: 'forwards', opacity: 0,
        borderColor: isHovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 16px 48px rgba(0,0,0,0.4)' : 'none'
      }}
    >
      <div style={{ padding: '20px 24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <img 
            src={booking.expertId.profileImage} 
            alt={booking.expertId.name} 
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0A0F1E', background: '#0A0F1E' }}
          />
          <div>
            <h3 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
              {booking.expertId.name}
            </h3>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', color: '#CBD5E1', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
              {booking.expertId.category}
            </span>
          </div>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ color: '#94A3B8', fontSize: '13px', display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
            <CalendarDays size={16} color="#818CF8" />
            <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{formatDate(booking.date)}</span>
          </div>
          <div style={{ color: '#94A3B8', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Clock size={16} color="#34D399" />
            <span style={{ color: '#F1F5F9', fontWeight: 500 }}>{booking.timeSlot}</span>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <StatusBadge status={booking.status} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
          {getDaysDiff(booking.date)}
        </span>
      </div>
    </div>
  );
};

export default MyBookingsPage;
