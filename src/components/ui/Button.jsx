import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg focus:ring-4 focus:ring-primary/20',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg focus:ring-4 focus:ring-emerald-500/20',
    outline: 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary focus:ring-4 focus:ring-primary/10',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md focus:ring-4 focus:ring-red-500/20',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none outline-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

