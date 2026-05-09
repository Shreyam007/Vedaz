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
  const { register, handleSubmit, formState: { errors, submitCount } } = useForm({
    resolver: zodResolver(schema)
  });

  const baseInputClass = "w-full pl-11 pr-4 py-3 bg-white/[0.04] border rounded-xl outline-none transition-all duration-200 text-white placeholder:text-slate-500 focus:bg-white/[0.06]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className={`relative ${errors.userName ? 'animate-shake' : ''}`}>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
        <div className="relative group">
          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.userName ? 'text-red-500' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
          <input 
            {...register('userName')}
            className={`${baseInputClass} ${errors.userName ? 'border-red-500/60 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20'}`}
            placeholder="John Doe"
          />
        </div>
        {errors.userName && <p className="text-red-400 text-sm mt-1.5 font-medium">{errors.userName.message}</p>}
      </div>

      <div className={`relative ${errors.email ? 'animate-shake' : ''}`}>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
        <div className="relative group">
          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-500' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
          <input 
            {...register('email')}
            type="email"
            className={`${baseInputClass} ${errors.email ? 'border-red-500/60 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20'}`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1.5 font-medium">{errors.email.message}</p>}
      </div>

      <div className={`relative ${errors.phone ? 'animate-shake' : ''}`}>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number *</label>
        <div className="relative group">
          <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.phone ? 'text-red-500' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
          <input 
            {...register('phone')}
            className={`${baseInputClass} ${errors.phone ? 'border-red-500/60 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20'}`}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        {errors.phone && <p className="text-red-400 text-sm mt-1.5 font-medium">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Meeting Notes <span className="text-slate-600 font-normal normal-case tracking-normal">(Optional)</span></label>
        <div className="relative group">
          <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <textarea 
            {...register('notes')}
            rows="3"
            className={`w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl outline-none transition-all duration-200 text-white placeholder:text-slate-500 focus:bg-white/[0.06] focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 resize-none`}
            placeholder="Any specific topics you want to discuss?"
          ></textarea>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] hover:-translate-y-[1px] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 flex justify-center items-center mt-4"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        ) : (
          'Confirm Booking'
        )}
      </button>
    </form>
  );
};

export default BookingForm;
