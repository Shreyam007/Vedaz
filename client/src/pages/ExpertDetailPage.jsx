import { useParams } from 'react-router-dom';
import useExpertDetail from '../hooks/useExpertDetail';
import useSocket from '../hooks/useSocket';
import SlotGrid from '../components/SlotGrid';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Badge from '../components/Badge';
import { Star, Briefcase, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExpertDetailPage = () => {
  const { id } = useParams();
  const { data: expert, isLoading, isError, error, refetch, updateSlotOptimistically } = useExpertDetail(id);

  useSocket(id, (payload) => {
    // payload: { expertId, date, timeSlot }
    if (payload.expertId === id) {
      updateSlotOptimistically(payload.date, payload.timeSlot);
    }
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message={error?.response?.data?.message || error.message} onRetry={refetch} />;
  if (!expert) return <ErrorMessage message="Expert not found." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-in">
      <Link to="/experts" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors font-medium">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Experts
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary to-accent/80"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 mb-6">
            <img 
              src={expert.profileImage} 
              alt={expert.name} 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{expert.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <Badge text={expert.category} />
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1.5" />
                  <span className="font-medium">{expert.rating.toFixed(1)} Rating</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                  <Briefcase className="w-4 h-4 text-gray-400 mr-1.5" />
                  <span className="font-medium">{expert.experience} Years Exp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-gray-700 leading-relaxed">
            <h3 className="font-bold text-gray-900 mb-2">About {expert.name.split(' ')[0]}</h3>
            {expert.bio}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Book a Session</h2>
        <p className="text-gray-500 mb-8">Select an available time slot below. Slots are in your local time zone.</p>
        
        <SlotGrid slots={expert.availableSlots} expertId={expert._id} />
      </div>
    </div>
  );
};

export default ExpertDetailPage;
