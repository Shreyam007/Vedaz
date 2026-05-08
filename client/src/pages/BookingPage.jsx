import { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import { createBooking } from '../api/bookingApi';
import useToast from '../hooks/useToast';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { formatDate } from '../utils/formatDate';
import { ChevronLeft, CalendarClock, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        expertId,
        date,
        timeSlot,
        ...formData
      };
      const response = await createBooking(payload);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#1E3A5F', '#ffffff']
      });

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
      <div className="text-center py-12">
        <p className="text-red-500 font-medium mb-4">Invalid booking details.</p>
        <Link to="/experts" className="text-accent hover:underline">Go to Experts</Link>
      </div>
    );
  }

  if (successData) {
    return (
      <div className="max-w-xl mx-auto mt-12 fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-8">We've sent a confirmation email to {successData.email}</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 space-y-4">
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-500">Expert</span>
              <span className="font-semibold text-primary">{expert.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-4">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-primary">{formatDate(successData.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-semibold text-accent">{successData.timeSlot}</span>
            </div>
          </div>

          <Link to="/my-bookings" className="inline-block w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-primary/90 transition-colors">
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto fade-in">
      <Link to={`/experts/${expertId}`} className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium mb-6">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Profile
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-primary p-8 text-white flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Complete your booking</h1>
            <p className="text-primary-100 opacity-80">Session with {expert.name}</p>
          </div>
          <img src={expert.profileImage} alt={expert.name} className="w-16 h-16 rounded-full border-2 border-white/20 object-cover" />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 bg-accent/10 text-accent p-4 rounded-xl mb-8 border border-accent/20">
            <CalendarClock className="w-6 h-6" />
            <div>
              <p className="font-semibold">{formatDate(date)}</p>
              <p className="text-sm opacity-90">{timeSlot}</p>
            </div>
          </div>

          <BookingForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default BookingPage;
