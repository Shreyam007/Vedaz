import { useState, useEffect } from 'react';
import useExperts from '../hooks/useExperts';
import ExpertCard from '../components/ExpertCard';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['All', 'Technology', 'Finance', 'Health', 'Legal', 'Marketing', 'Design'];

const ExpertListPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error, refetch } = useExperts({
    page,
    limit: 8,
    category: category === 'All' ? '' : category,
    search: debouncedSearch
  });

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', paddingTop: '64px' }}>
      
      {/* HERO SECTION */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)'
      }}>
        {/* Floating Orbs */}
        <div style={{
          position: 'absolute', top: '-60px', left: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          animation: 'float-orb 10s ease-in-out infinite',
          pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', right: '10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.10) 0%, transparent 70%)',
          animation: 'float-orb-reverse 12s ease-in-out infinite',
          pointerEvents: 'none', zIndex: 0
        }} />

        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #F1F5F9 0%, #818CF8 50%, #34D399 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
          position: 'relative', zIndex: 1
        }}>
          Find Your Expert
        </h1>
        
        <p style={{ 
          color: '#64748B', fontSize: '17px', fontWeight: 400,
          marginBottom: '40px', position: 'relative', zIndex: 1 
        }}>
          Connect with world-class professionals — real-time availability
        </p>

        {/* Search Bar Wrapper */}
        <div style={{
          maxWidth: '600px', margin: '0 auto',
          position: 'relative', zIndex: 1
        }}>
          <input 
            type="text" 
            placeholder="Search experts by name..."
            style={{
              width: '100%', padding: '16px 20px 16px 52px',
              background: 'rgba(255,255,255,0.05)',
              border: isFocused ? '1px solid rgba(99,102,241,0.6)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: '16px',
              color: '#F1F5F9', fontSize: '15px', fontWeight: 400,
              outline: 'none',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              boxShadow: isFocused ? '0 0 0 4px rgba(99,102,241,0.15)' : 'none'
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {/* Mock search icon inside input via background image or absolute element */}
          <div style={{
            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isFocused ? '#818CF8' : '#64748B'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* FILTER PILLS ROW */}
      <div className="hide-scrollbar" style={{
        display: 'flex', gap: '10px', overflowX: 'auto',
        padding: '0 24px', marginBottom: '16px',
        scrollbarWidth: 'none',
      }}>
        {categories.map(cat => {
          const isActive = category === cat || (category === '' && cat === 'All');
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={isActive ? {
                padding: '8px 20px', borderRadius: '999px', border: 'none',
                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                color: '#fff', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                transition: 'all 0.2s ease'
              } : {
                padding: '8px 20px', borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: '#94A3B8', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* EXPERT GRID WRAPPER */}
      <div style={{ padding: '0 24px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        {isError ? (
          <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {isLoading ? (
                [...Array(8)].map((_, i) => <SkeletonCard key={i} index={i} />)
              ) : data?.data?.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center' }}>
                  <p style={{ color: '#94A3B8', fontSize: '18px' }}>No experts found matching your criteria.</p>
                </div>
              ) : (
                data?.data?.map((expert, index) => (
                  <ExpertCard key={expert._id} expert={expert} index={index} />
                ))
              )}
            </div>

            {/* Pagination */}
            {!isLoading && data?.pagination && (
              <Pagination 
                currentPage={data.pagination.page} 
                totalPages={data.pagination.pages} 
                onPageChange={setPage} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExpertListPage;
