import { cn } from './Button';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white border border-slate-100 shadow-xl shadow-blue-500/5 rounded-[32px] overflow-hidden transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => (
  <div className={cn('p-6 border-b border-slate-50', className)}>{children}</div>
);

export const CardContent = ({ className, children }) => (
  <div className={cn('p-6', className)}>{children}</div>
);

export const CardFooter = ({ className, children }) => (
  <div className={cn('p-6 border-t border-slate-50 bg-slate-50/50', className)}>{children}</div>
);

