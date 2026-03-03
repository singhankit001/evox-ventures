import { forwardRef } from 'react';

export const Card = forwardRef(({ 
  className = '', 
  children, 
  hoverable = true,
  ...props 
}, ref) => {
  const baseStyles = "glass-surface relative overflow-hidden rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const hoverStyles = hoverable 
    ? "hover:-translate-y-3 hover:scale-[1.01] hover:border-white/20 hover:shadow-[0_60px_90px_-20px_rgba(0,0,0,0.9)]" 
    : "";

  return (
    <div 
      ref={ref}
      className={`${baseStyles} ${hoverStyles} ${className}`} 
      {...props}
    >
      {/* Dynamic Inner Light Sweep */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
      
      {/* content layer */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
});

Card.displayName = 'Card';
