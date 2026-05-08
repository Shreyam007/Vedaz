import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'text-accent border-b-2 border-accent' : 'text-gray-500 hover:text-primary';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="font-bold text-xl text-primary tracking-tight">Vedaz</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/experts" className={`flex items-center gap-2 h-full px-1 font-medium transition-colors duration-200 ${isActive('/experts')}`}>
              <Users className="w-4 h-4" />
              <span>Experts</span>
            </Link>
            <Link to="/my-bookings" className={`flex items-center gap-2 h-full px-1 font-medium transition-colors duration-200 ${isActive('/my-bookings')}`}>
              <Calendar className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
