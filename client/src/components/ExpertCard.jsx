import { useState } from 'react';
import { Star, Briefcase, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categoryGradients = {
  Technology: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
  Finance:    'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)',
  Health:     'linear-gradient(135deg, #4c0519 0%, #881337 50%, #4c0519 100%)',
  Legal:      'linear-gradient(135deg, #451a03 0%, #92400e 50%, #451a03 100%)',
  Marketing:  'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #0c1445 100%)',
  Design:     'linear-gradient(135deg, #2e1065 0%, #6b21a8 50%, #2e1065 100%)',
};

const categoryColors = {
  Technology: { bg: 'rgba(99,102,241,0.15)', text: '#818CF8', border: 'rgba(99,102,241,0.3)' },
  Finance:    { bg: 'rgba(16,185,129,0.15)', text: '#34D399', border: 'rgba(16,185,129,0.3)' },
  Health:     { bg: 'rgba(244,63,94,0.15)',  text: '#FB7185', border: 'rgba(244,63,94,0.3)'  },
  Legal:      { bg: 'rgba(245,158,11,0.15)', text: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
  Marketing:  { bg: 'rgba(14,165,233,0.15)', text: '#38BDF8', border: 'rgba(14,165,233,0.3)' },
  Design:     { bg: 'rgba(168,85,247,0.15)', text: '#C084FC', border: 'rgba(168,85,247,0.3)' },
};

const ExpertCard = ({ expert, index = 0 }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const category = expert.category;

  return (
    <div 
      className="animate-stagger"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
        boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.5)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/experts/${expert._id}`)}
    >
      <div style={{
        height: '100px',
        background: categoryGradients[category] || categoryGradients.Technology,
        position: 'relative',
      }}>
        {expert.profileImage ? (
          <img 
            src={expert.profileImage} 
            alt={expert.name} 
            style={{
              width: '64px', height: '64px', borderRadius: '50%',
              border: '3px solid #0F1629',
              objectFit: 'cover',
              position: 'absolute', bottom: '-28px', left: '50%',
              transform: 'translateX(-50%)',
              background: categoryGradients[category] || categoryGradients.Technology,
            }}
          />
        ) : (
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            border: '3px solid #0F1629',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'absolute', bottom: '-28px', left: '50%',
            transform: 'translateX(-50%)',
            background: categoryGradients[category] || categoryGradients.Technology,
            color: '#fff', fontSize: '20px', fontWeight: 'bold'
          }}>
            {expert.name.charAt(0)}
          </div>
        )}
      </div>

      <div style={{ padding: '40px 20px 20px', textAlign: 'center' }}>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '17px',
          fontWeight: 700,
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          {expert.name}
        </h3>
        
        <span style={{
          display: 'inline-block',
          background: categoryColors[category]?.bg || categoryColors.Technology.bg,
          color: categoryColors[category]?.text || categoryColors.Technology.text,
          border: `1px solid ${categoryColors[category]?.border || categoryColors.Technology.border}`,
          borderRadius: '20px',
          padding: '3px 10px',
          fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          {category}
        </span>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} color="#FCD34D" fill="#FCD34D" />
            <span style={{ color: '#FCD34D', fontSize: '13px', fontWeight: 600 }}>
              {expert.rating?.toFixed(1) || '5.0'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Briefcase size={14} color="#94A3B8" />
            <span style={{ color: '#94A3B8', fontSize: '13px', fontWeight: 500 }}>
              {expert.experience} yrs
            </span>
          </div>
        </div>

        <button 
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            border: 'none', borderRadius: '12px',
            color: '#fff', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: isBtnHovered ? '0 8px 30px rgba(99,102,241,0.55)' : '0 4px 15px rgba(99,102,241,0.3)',
            transform: isBtnHovered ? 'translateY(-1px)' : 'translateY(0)',
            display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '6px'
          }}
        >
          View Profile
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExpertCard;
