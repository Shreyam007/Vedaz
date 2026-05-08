import { Link } from 'react-router-dom';
import { Star, Briefcase } from 'lucide-react';
import Badge from './Badge';

const ExpertCard = ({ expert }) => {
  return (
    <Link to={`/experts/${expert._id}`} className="group block h-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full flex flex-col fade-in">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={expert.profileImage} 
              alt={expert.name} 
              className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-50 group-hover:ring-accent/20 transition-all"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors">{expert.name}</h3>
            <Badge text={expert.category} />
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm line-clamp-2 flex-1">
          {expert.bio}
        </p>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>{expert.experience} yrs exp</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-700">{expert.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExpertCard;
