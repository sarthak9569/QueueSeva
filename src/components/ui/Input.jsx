import React from 'react';
import { cn } from './Button';

export const Input = ({ className, icon: Icon, label, error, ...props }) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors duration-200">
            <Icon size={18} />
          </div>
        )}
        <input
          className={cn(
            'w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-200 outline-none',
            'placeholder:text-slate-300 placeholder:italic focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white',
            Icon && 'pl-12',
            error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

Input.displayName = 'Input';
