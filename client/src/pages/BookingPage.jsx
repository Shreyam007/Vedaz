import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import { createBooking } from '../api/bookingApi';
import useToast from '../hooks/useToast';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { formatDate } from '../utils/formatDate';
import { ChevronLeft, CalendarClock, ShieldCheck, Check } from 'lucide-react';

const BookingPage = () => {
  const { expertId } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const timeSlot = searchParams.get('slot');
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const { data: expert, isLoading } = useExpertDetail(expertId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const payload = { expertId, date, timeSlot, ...formData };
      const response = await createBooking(payload);
      setSuccessData(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        showToast("This slot was just taken! Go back and pick another.", 'error');
        setTimeout(() => navigate(`/experts/${expertId}`), 3000);
      } else {
        showToast(error.response?.data?.message || 'Failed to book slot. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!expert || !date || !timeSlot) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: '#EF4444', fontWeight: 500, marginBottom: '16px' }}>Invalid booking details.</p>
        <Link to="/experts" style={{ color: '#6366F1', textDecoration: 'underline' }}>Go to Experts</Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0F1E',
      paddingTop: '88px',
      paddingBottom: '60px',
      paddingLeft: '24px',
      paddingRight: '24px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        
        {/* Back button */}
        <div style={{ marginBottom: '28px' }}>
          <Link to={`/experts/${expertId}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: '#6366F1', background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            padding: '8px 16px', borderRadius: '10px',
            cursor: 'pointer', fontSize: '14px', fontWeight: 500,
            textDecoration: 'none', transition: 'all 0.2s ease'
          }}>
            <ChevronLeft size={16} /> Back to Slots
          </Link>
        </div>

        {/* TWO COLUMN GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
          gap: '32px',
          alignItems: 'start',
        }}>
          
          {/* LEFT — SUMMARY CARD */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '32px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            position: 'sticky',
            top: '96px',
          }}>
            <h3 style={{ color: '#F1F5F9', fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>
              BOOKING SUMMARY
            </h3>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px', marginBottom: '20px'
            }}>
              <img 
                src={expert.profileImage} 
                alt={expert.name} 
                style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.4)', objectFit: 'cover' }}
              />
              <div>
                <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '15px' }}>{expert.name}</div>
                <div style={{ color: '#818CF8', fontSize: '12px', fontWeight: 500 }}>{expert.category}</div>
              </div>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(99,102,241,0.10)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '12px', padding: '16px', marginBottom: '12px'
            }}>
              <CalendarClock style={{ color: '#818CF8', fontSize: '20px' }} />
              <div>
                <div style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '15px' }}>{formatDate(date)}</div>
                <div style={{ color: '#F1F5F9', fontWeight: 400, fontSize: '14px', opacity: 0.8 }}>{timeSlot}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px', marginTop: '20px' }}>
              <ShieldCheck size={16} /> 🔒 Your data stays private
            </div>
          </div>

          {/* RIGHT — FORM CARD */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '40px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}>
            <h2 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '28px' }}>
              Complete Your Booking
            </h2>
            <BookingForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </div>

        </div>
      </div>

      {/* Success Modal Overlay */}
      {successData && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div style={{
            background: '#0F1629',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '28px', padding: '48px 40px',
            maxWidth: '440px', width: '100%', textAlign: 'center',
            animation: 'fadeSlideUp 0.4s ease',
            boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Confetti Particles Generator */}
            {Array.from({ length: 20 }).map((_, i) => {
              const colors = ['#6366F1','#10B981','#F59E0B','#EF4444','#EC4899','#34D399'];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const size = 6 + Math.random() * 8;
              return (
                <div key={i} style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  width: `${size}px`,
                  height: `${size}px`,
                  background: color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  animation: `confetti-fall ${2 + Math.random() * 3}s ${Math.random() * 1.5}s ease forwards`,
                  pointerEvents: 'none', position: 'absolute', zIndex: -1
                }} />
              );
            })}
            
            <div style={{
              width: '88px', height: '88px', borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)',
              border: '2px solid #10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', fontSize: '36px', position: 'relative'
            }}>
              <div style={{
                position: 'absolute', inset: '-12px', borderRadius: '50%',
                border: '2px solid rgba(16,185,129,0.4)',
                animation: 'pulse-ring 1.8s ease infinite'
              }} />
              <div style={{
                position: 'absolute', inset: '-24px', borderRadius: '50%',
                border: '2px solid rgba(16,185,129,0.4)',
                animation: 'pulse-ring 1.8s ease infinite',
                animationDelay: '0.6s'
              }} />
              <Check size={40} color="#10B981" />
            </div>

            <h2 style={{
              fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #34D399, #10B981)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Booking Confirmed!
            </h2>
            <p style={{ color: '#94A3B8', marginBottom: '24px' }}>
              We've sent a calendar invite to <span style={{ color: '#fff' }}>{successData.email}</span>
            </p>

            <Link 
              to="/my-bookings" 
              style={{
                display: 'block', width: '100%', padding: '16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', color: '#fff', fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              View My Bookings
            </Link>
          </div>
        </div>
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default BookingPage;
