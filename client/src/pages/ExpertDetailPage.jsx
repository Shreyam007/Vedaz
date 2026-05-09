import { useParams, Link } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import useSocket from '../hooks/useSocket';
import SlotGrid from '../components/SlotGrid';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Star, Briefcase, ChevronLeft, ShieldCheck } from 'lucide-react';

const ExpertDetailPage = () => {
  const { id } = useParams();
  const { data: expert, isLoading, isError, error, refetch, updateSlotOptimistically } = useExpertDetail(id);

  useSocket(id, {
    onSlotBooked: (payload) => {
      if (payload.expertId === id) {
        updateSlotOptimistically(payload.date, payload.timeSlot);
      }
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />;
  if (!expert) return <ErrorMessage message="Expert not found." />;

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ padding: '0 24px', maxWidth: '1100px', margin: '0 auto' }}>
        
        <Link to="/experts" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: '#6366F1', background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          padding: '8px 16px', borderRadius: '10px',
          cursor: 'pointer', fontSize: '14px', fontWeight: 500,
          marginBottom: '32px', transition: 'all 0.2s ease',
          textDecoration: 'none'
        }}>
          <ChevronLeft size={16} /> Back to Experts
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="md:grid-cols-[1fr_1.6fr]">
          
          {/* LEFT — EXPERT PROFILE CARD */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px', padding: '40px 32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            textAlign: 'center',
            height: 'fit-content'
          }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1, #34D399)',
              padding: '3px', margin: '0 auto 20px', display: 'flex'
            }}>
              {expert.profileImage ? (
                <img 
                  src={expert.profileImage} 
                  alt={expert.name} 
                  style={{ borderRadius: '50%', width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{
                  borderRadius: '50%', width: '100%', height: '100%',
                  background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '40px', fontWeight: 'bold'
                }}>
                  {expert.name.charAt(0)}
                </div>
              )}
            </div>

            <h1 style={{
              color: '#FFFFFF',
              fontSize: '28px', fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '12px'
            }}>
              {expert.name}
            </h1>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'rgba(16,185,129,0.12)', color: '#34D399',
              border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '999px', padding: '4px 12px',
              fontSize: '12px', fontWeight: 600, marginBottom: '20px'
            }}>
              <ShieldCheck size={14} /> Verified
            </div>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: '0',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px', padding: '16px', marginBottom: '24px'
            }}>
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
                <div style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700 }}>
                  {expert.rating?.toFixed(1) || '5.0'}
                </div>
                <div style={{ color: '#64748B', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase' }}>
                  Rating
                </div>
              </div>
              <div style={{ padding: '0 24px' }}>
                <div style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700 }}>
                  {expert.experience}
                </div>
                <div style={{ color: '#64748B', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase' }}>
                  Years Exp
                </div>
              </div>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.7, textAlign: 'left' }}>
              {expert.bio}
            </p>
          </div>

          {/* RIGHT — SLOT SECTION */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px', padding: '32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'sticky', top: '88px',
            height: 'fit-content'
          }}>
            <h2 style={{ 
              color: '#F1F5F9', fontSize: '20px', fontWeight: 700, marginBottom: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' 
            }}>
              Available Sessions
              
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(16,185,129,0.12)', color: '#34D399',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '999px', padding: '4px 10px', fontSize: '12px', fontWeight: 600
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', animation: 'pulse-glow 1.5s infinite' }} />
                Live
              </div>
            </h2>
            
            <SlotGrid slots={expert.availableSlots} expertId={expert._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
