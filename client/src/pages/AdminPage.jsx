import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Loader';
import { formatDate } from '../utils/formatDate';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/bookings/all');
      setBookings(response.data.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/bookings/${id}/status`, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      showToast(`Status updated to ${newStatus} ✓`);
    } catch (error) {
      console.error('Failed to update status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#F59E0B'; // amber
      case 'confirmed': return '#10B981'; // teal
      case 'completed': return '#6366F1'; // indigo
      default: return '#94A3B8';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', paddingTop: '88px', padding: '88px 24px 60px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '32px', fontWeight: 800,
          background: 'linear-gradient(135deg, #F1F5F9, #6366F1)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '8px' 
        }}>
          Admin Panel
        </h1>
        <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '32px' }}>
          Manage all booking statuses
        </p>

        {isLoading ? (
          <Loader />
        ) : bookings.length === 0 ? (
          <p style={{ color: '#94A3B8' }}>No bookings found.</p>
        ) : (
          <div>
            {bookings.map((booking) => (
              <div key={booking._id} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '20px 24px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
                marginBottom: '12px',
                transition: 'border-color 0.2s ease',
                borderLeft: `4px solid ${getStatusColor(booking.status)}`
              }}>
                <div style={{ flex: '1 1 200px' }}>
                  <h3 style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{booking.userName}</h3>
                  <span style={{ color: '#94A3B8', fontSize: '13px' }}>{booking.email}</span>
                </div>
                
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ color: '#F1F5F9', fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>{booking.expertId?.name}</div>
                  <span style={{ color: '#6366F1', fontSize: '12px', background: 'rgba(99,102,241,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {booking.expertId?.category}
                  </span>
                </div>

                <div style={{ flex: '1 1 150px' }}>
                  <div style={{ color: '#F1F5F9', fontSize: '14px', marginBottom: '4px' }}>{formatDate(booking.date)}</div>
                  <div style={{ color: '#34D399', fontSize: '13px' }}>{booking.timeSlot}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    color: getStatusColor(booking.status), fontSize: '12px', fontWeight: 700, 
                    textTransform: 'uppercase', letterSpacing: '0.05em' 
                  }}>
                    {booking.status}
                  </span>
                  <select 
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px', padding: '8px 14px',
                      color: '#F1F5F9', fontSize: '13px', fontWeight: 600,
                      cursor: 'pointer', outline: 'none', fontFamily: 'inherit'
                    }}
                  >
                    <option value="Pending" style={{ color: '#0A0F1E' }}>Pending</option>
                    <option value="Confirmed" style={{ color: '#0A0F1E' }}>Confirmed</option>
                    <option value="Completed" style={{ color: '#0A0F1E' }}>Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast.show && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: 'rgba(15,22,41,0.95)', border: '1px solid #10B981',
          borderLeft: '4px solid #10B981', borderRadius: '14px', padding: '14px 20px',
          color: '#F1F5F9', fontSize: '14px', fontWeight: 500,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease'
        }}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
