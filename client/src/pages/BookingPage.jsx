import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import { createBooking } from '../api/bookingApi';
import useToast from '../hooks/useToast';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { formatDate } from '../utils/formatDate';
import { ChevronLeft, CalendarClock, ShieldCheck, Check } from 'lucide-react';
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

  useEffect(() => {
    if (successData) {
      // Small delay then confetti
      setTimeout(() => {
        const colors = ['#10B981', '#0D9488', '#ffffff', '#6366F1'];
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              spread: 100,
              origin: { y: 0.6, x: Math.random() * 0.5 + 0.25 },
              colors: colors
            });
          }, i * 400);
        }
      }, 100);
    }
  }, [successData]);

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
      <div className="text-center py-20 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ChevronLeft className="w-8 h-8" />
        </div>
        <p className="text-white font-bold text-xl mb-4">Invalid booking details</p>
        <Link to="/experts" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors">Go back to Experts</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-slide-up relative">
      <Link to={`/experts/${expertId}`} className="inline-flex items-center text-slate-400 hover:text-white transition-colors font-semibold mb-8 group">
        <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mr-3 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        Back to Profile
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT - Summary Card */}
        <div className="w-full lg:w-5/12">
          <div className="glass p-8 lg:sticky lg:top-28">
            <h3 className="text-lg font-extrabold text-white mb-6">Booking Summary</h3>
            
            {/* Expert Mini Profile */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-[#0A0F1E] overflow-hidden bg-slate-800 shrink-0">
                {expert.profileImage ? (
                  <img src={expert.profileImage} alt={expert.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-white bg-indigo-600">
                    {expert.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{expert.name}</h4>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{expert.category}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-bold">{formatDate(date)}</p>
                  <p className="text-indigo-400 font-semibold">{timeSlot}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                60 min session
              </div>
            </div>

            <div className="h-px bg-white/[0.06] w-full mb-6" />

            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              🔒 Your data stays private & secure
            </div>
          </div>
        </div>

        {/* RIGHT - Booking Form */}
        <div className="w-full lg:w-7/12">
          <div className="glass p-8">
            <h2 className="text-2xl font-extrabold text-white mb-8">Complete Your Booking</h2>
            <BookingForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {successData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center overflow-y-auto">
          <div className="glass max-w-md w-full mx-4 mt-[15vh] mb-10 p-8 text-center animate-stagger-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            
            <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500 bg-emerald-500/20" />
              <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ripple" style={{ animationDelay: '0s' }} />
              <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ripple" style={{ animationDelay: '0.75s' }} />
              <Check className="w-10 h-10 text-emerald-400 relative z-10" />
            </div>

            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">Booking Confirmed!</h2>
            <p className="text-slate-400 font-medium mb-8">We've sent a calendar invite to <span className="text-white">{successData.email}</span></p>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 text-left mb-8 space-y-4">
              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-slate-500 font-medium">Expert</span>
                <span className="font-bold text-white">{expert.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-4">
                <span className="text-slate-500 font-medium">Date</span>
                <span className="font-bold text-white">{formatDate(successData.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Time</span>
                <span className="font-bold text-emerald-400">{successData.timeSlot}</span>
              </div>
            </div>

            <Link 
              to="/my-bookings" 
              className="block w-full py-3.5 rounded-xl bg-white/[0.04] text-white font-bold border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
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
