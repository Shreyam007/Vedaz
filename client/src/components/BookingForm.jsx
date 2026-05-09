import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Phone, FileText, Loader2 } from 'lucide-react';

const schema = z.object({
  userName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  notes: z.string().optional(),
});

const BookingForm = ({ onSubmit, isSubmitting }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const [focusedField, setFocusedField] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className={errors.userName ? 'animate-shake' : ''}>
        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          Full Name *
        </label>
        <div style={{ position: 'relative' }}>
          <User size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.userName ? '#EF4444' : (focusedField === 'userName' ? '#6366F1' : '#64748B'), transition: 'color 0.2s ease' }} />
          <input 
            {...register('userName')}
            onFocus={() => setFocusedField('userName')}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              background: focusedField === 'userName' ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
              border: errors.userName ? '1px solid rgba(239,68,68,0.7)' : (focusedField === 'userName' ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.10)'),
              borderRadius: '14px', color: '#F1F5F9',
              fontSize: '15px', fontFamily: 'inherit', outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: focusedField === 'userName' ? '0 0 0 4px rgba(99,102,241,0.12)' : 'none'
            }}
            placeholder="John Doe"
          />
        </div>
        {errors.userName && <p style={{ color: '#F87171', fontSize: '12px', fontWeight: 500, marginTop: '6px' }}>{errors.userName.message}</p>}
      </div>

      <div className={errors.email ? 'animate-shake' : ''}>
        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          Email Address *
        </label>
        <div style={{ position: 'relative' }}>
          <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.email ? '#EF4444' : (focusedField === 'email' ? '#6366F1' : '#64748B'), transition: 'color 0.2s ease' }} />
          <input 
            {...register('email')}
            type="email"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              background: focusedField === 'email' ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
              border: errors.email ? '1px solid rgba(239,68,68,0.7)' : (focusedField === 'email' ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.10)'),
              borderRadius: '14px', color: '#F1F5F9',
              fontSize: '15px', fontFamily: 'inherit', outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(99,102,241,0.12)' : 'none'
            }}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && <p style={{ color: '#F87171', fontSize: '12px', fontWeight: 500, marginTop: '6px' }}>{errors.email.message}</p>}
      </div>

      <div className={errors.phone ? 'animate-shake' : ''}>
        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          Phone Number *
        </label>
        <div style={{ position: 'relative' }}>
          <Phone size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: errors.phone ? '#EF4444' : (focusedField === 'phone' ? '#6366F1' : '#64748B'), transition: 'color 0.2s ease' }} />
          <input 
            {...register('phone')}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              background: focusedField === 'phone' ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
              border: errors.phone ? '1px solid rgba(239,68,68,0.7)' : (focusedField === 'phone' ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.10)'),
              borderRadius: '14px', color: '#F1F5F9',
              fontSize: '15px', fontFamily: 'inherit', outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: focusedField === 'phone' ? '0 0 0 4px rgba(99,102,241,0.12)' : 'none'
            }}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        {errors.phone && <p style={{ color: '#F87171', fontSize: '12px', fontWeight: 500, marginTop: '6px' }}>{errors.phone.message}</p>}
      </div>

      <div>
        <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          Meeting Notes (Optional)
        </label>
        <div style={{ position: 'relative' }}>
          <FileText size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: focusedField === 'notes' ? '#6366F1' : '#64748B', transition: 'color 0.2s ease' }} />
          <textarea 
            {...register('notes')}
            rows="3"
            onFocus={() => setFocusedField('notes')}
            onBlur={() => setFocusedField(null)}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              background: focusedField === 'notes' ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.05)',
              border: focusedField === 'notes' ? '1px solid rgba(99,102,241,0.7)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: '14px', color: '#F1F5F9',
              fontSize: '15px', fontFamily: 'inherit', outline: 'none',
              transition: 'all 0.2s ease',
              boxShadow: focusedField === 'notes' ? '0 0 0 4px rgba(99,102,241,0.12)' : 'none',
              resize: 'none'
            }}
            placeholder="Any specific topics you want to discuss?"
          ></textarea>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        onMouseEnter={() => setHoveredBtn(true)}
        onMouseLeave={() => setHoveredBtn(false)}
        style={{
          width: '100%', padding: '16px',
          background: isSubmitting ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366F1, #4F46E5)',
          border: 'none', borderRadius: '14px', color: '#fff',
          fontSize: '16px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease', marginTop: '8px',
          boxShadow: (!isSubmitting && hoveredBtn) ? '0 12px 40px rgba(99,102,241,0.55)' : '0 8px 30px rgba(99,102,241,0.4)',
          transform: (!isSubmitting && hoveredBtn) ? 'translateY(-2px)' : 'translateY(0)',
          fontFamily: 'inherit',
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        {isSubmitting ? (
          <Loader2 size={24} className="animate-spin" />
        ) : (
          'Confirm Booking'
        )}
      </button>
    </form>
  );
};

export default BookingForm;
