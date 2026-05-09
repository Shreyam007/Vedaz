import React from 'react';

const SkeletonCard = ({ index = 0 }) => {
  return (
    <div 
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
        height: '320px',
        display: 'flex',
        flexDirection: 'column'
      }}
      className="animate-stagger"
    >
      <div 
        className="animate-shimmer"
        style={{
          height: '100px',
          background: 'rgba(255,255,255,0.04)',
          position: 'relative',
        }}
      >
        <div 
          className="animate-shimmer"
          style={{
            width: '64px', height: '64px', borderRadius: '50%',
            border: '3px solid #0F1629',
            position: 'absolute', bottom: '-28px', left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.08)'
          }}
        />
      </div>

      <div style={{ padding: '40px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <div 
          className="animate-shimmer"
          style={{
            height: '24px', width: '60%', borderRadius: '4px',
            background: 'rgba(255,255,255,0.04)', marginBottom: '12px'
          }}
        />
        
        <div 
          className="animate-shimmer"
          style={{
            height: '20px', width: '30%', borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)', marginBottom: '20px'
          }}
        />

        <div style={{ display: 'flex', gap: '20px', marginBottom: 'auto', width: '100%', justifyContent: 'center' }}>
          <div 
            className="animate-shimmer"
            style={{
              height: '18px', width: '20%', borderRadius: '4px',
              background: 'rgba(255,255,255,0.04)'
            }}
          />
          <div 
            className="animate-shimmer"
            style={{
              height: '18px', width: '20%', borderRadius: '4px',
              background: 'rgba(255,255,255,0.04)'
            }}
          />
        </div>

        <div 
          className="animate-shimmer"
          style={{
            height: '44px', width: '100%', borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)', marginTop: '20px'
          }}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;
