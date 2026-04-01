import { forwardRef } from 'react';

export const Card = forwardRef(({ 
  className = '', 
  children, 
  hoverable = true,
  ...props 
}, ref) => {
  const baseStyles = "relative overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2)]";
  
  const hoverStyles = hoverable 
    ? "transition duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-orange-500/40 hover:shadow-[0_12px_40px_-12px_rgba(249,115,22,0.3)] hover:bg-white/[0.04]" 
    : "";

  return (
    <div 
      ref={ref}
      className={`${baseStyles} ${hoverStyles} ${className}`} 
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" aria-hidden="true" />
      {children}
    </div>
  );
});

Card.displayName = 'Card';
