import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ show, message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  if (!isVisible) return null;

  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle : XCircle;
  const borderColor = isSuccess ? '#10B981' : '#EF4444';

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{
        minWidth: '300px', maxWidth: '380px',
        background: 'rgba(15,22,41,0.95)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: '14px', padding: '14px 16px',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        animation: 'toast-slide-in 0.35s ease forwards',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'flex-start', gap: '12px'
      }}>
        <Icon color={borderColor} size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#F1F5F9', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
            {isSuccess ? 'Success' : 'Error'}
          </h4>
          <p style={{ color: '#94A3B8', fontSize: '13px', lineHeight: 1.4 }}>
            {message}
          </p>
        </div>

        {onClose && (
          <button 
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            style={{ background: 'none', border: 'none', padding: '4px', color: '#64748B', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        )}

        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '3px', background: borderColor,
          animation: 'drain 4s linear forwards', borderRadius: '0 0 0 14px'
        }} />
      </div>
    </div>
  );
};

export default Toast;
