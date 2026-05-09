import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-xl border-b border-white/[0.06] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="flex items-center justify-center relative">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent group-hover:from-teal-400 group-hover:to-indigo-400 transition-all duration-500">
                    ⚡ Vedaz
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/experts"
                className={`group flex items-center gap-2 h-full px-1 font-semibold transition-all duration-200 relative ${
                  isActive('/experts') ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className={`w-5 h-5 ${isActive('/experts') ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'}`} />
                <span>Experts</span>
                <span className={`absolute bottom-5 left-0 w-full h-[2px] bg-indigo-500 rounded-t-md transform origin-left transition-transform duration-300 ${isActive('/experts') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>

              <Link
                to="/my-bookings"
                className={`group flex items-center gap-2 h-full px-1 font-semibold transition-all duration-200 relative ${
                  isActive('/my-bookings') ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className={`w-5 h-5 ${isActive('/my-bookings') ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'}`} />
                <span>My Bookings</span>
                <span className={`absolute bottom-5 left-0 w-full h-[2px] bg-indigo-500 rounded-t-md transform origin-left transition-transform duration-300 ${isActive('/my-bookings') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-slate-400 hover:text-white p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0F1E]/95 backdrop-blur-2xl animate-fade-slide-up flex flex-col justify-center items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col gap-8 text-center">
            <Link 
              to="/experts" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-bold flex items-center justify-center gap-4 ${isActive('/experts') ? 'text-indigo-400' : 'text-white'}`}
            >
              <Users className="w-8 h-8" /> Experts
            </Link>
            <Link 
              to="/my-bookings" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-bold flex items-center justify-center gap-4 ${isActive('/my-bookings') ? 'text-indigo-400' : 'text-white'}`}
            >
              <Calendar className="w-8 h-8" /> Bookings
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
