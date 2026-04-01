import Link from 'next/link';

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = "", 
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold uppercase tracking-widest transition duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#FF6A00] text-white shadow-[0_4px_20px_rgba(255,106,0,0.25)] hover:shadow-[0_8px_32px_rgba(255,106,0,0.4)] border border-transparent",
    secondary: "bg-white/[0.03] text-white border border-white/[0.12] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)]",
    ghost: "bg-transparent text-white hover:text-[#FF6A00] hover:bg-white/5",
  };

  const combinedClasses = `${baseStyle} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} data-cursor-hover {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} data-cursor-hover {...props}>
      {children}
    </button>
  );
}
