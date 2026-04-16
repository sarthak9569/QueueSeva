import { cn } from './Button';

export const Badge = ({ className, variant = 'info', children, ...props }) => {
  const variants = {
    info: 'bg-blue-50 text-blue-600 border-blue-100/50',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
    warning: 'bg-amber-50 text-amber-600 border-amber-100/50',
    danger: 'bg-red-50 text-red-600 border-red-100/50',
    neutral: 'bg-slate-50 text-slate-600 border-slate-100/50',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm inline-flex items-center justify-center',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

