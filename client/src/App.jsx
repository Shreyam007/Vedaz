import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExpertListPage from './pages/ExpertListPage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/experts" replace />} />
            <Route path="/experts" element={<ExpertListPage />} />
            <Route path="/experts/:id" element={<ExpertDetailPage />} />
            <Route path="/book/:expertId" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
