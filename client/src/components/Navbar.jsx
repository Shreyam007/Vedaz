import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const isActive = (path) => location.pathname.startsWith(path);

  const getLinkStyle = (path) => {
    const active = isActive(path);
    const hovered = hoveredLink === path;
    
    return {
      color: active ? '#818CF8' : (hovered ? '#F1F5F9' : '#94A3B8'),
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      borderRadius: '8px',
      background: active ? 'rgba(99,102,241,0.12)' : (hovered ? 'rgba(255,255,255,0.06)' : 'transparent'),
      transition: 'all 0.2s ease'
    };
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        height: '64px',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{
              background: 'linear-gradient(135deg, #818CF8, #34D399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '22px', fontWeight: 800,
              letterSpacing: '-0.03em'
            }}>
              ⚡ Vedaz
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/experts"
            style={getLinkStyle('/experts')}
            onMouseEnter={() => setHoveredLink('/experts')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Users size={18} />
            <span>Experts</span>
          </Link>

          <Link
            to="/my-bookings"
            style={getLinkStyle('/my-bookings')}
            onMouseEnter={() => setHoveredLink('/my-bookings')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Calendar size={18} />
            <span>My Bookings</span>
          </Link>
          
          <Link
            to="/admin"
            style={{
              color: isActive('/admin') ? '#818CF8' : '#64748B',
              textDecoration: 'none', fontSize: '13px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 12px', marginLeft: '8px'
            }}
          >
            <Shield size={14} />
            <span>Admin</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(10,15,30,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          animation: 'fadeSlideUp 0.3s ease forwards'
        }}>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'center' }}>
            <Link 
              to="/experts" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none', fontSize: '24px', fontWeight: 700,
                color: isActive('/experts') ? '#818CF8' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
              }}
            >
              <Users size={28} /> Experts
            </Link>
            <Link 
              to="/my-bookings" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none', fontSize: '24px', fontWeight: 700,
                color: isActive('/my-bookings') ? '#818CF8' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
              }}
            >
              <Calendar size={28} /> Bookings
            </Link>
            <Link 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                textDecoration: 'none', fontSize: '18px', fontWeight: 600,
                color: isActive('/admin') ? '#818CF8' : '#64748B',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                marginTop: '12px'
              }}
            >
              <Shield size={20} /> Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
