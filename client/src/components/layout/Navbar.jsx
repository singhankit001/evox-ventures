'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { Button } from '@/components/ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrolled = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== lastScrolled.current) {
        lastScrolled.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className="container mx-auto">
        <div className={styles.navWrapper}>
          {/* Logo Section */}
          <Link href="/" className={styles.logo} onClick={handleHomeClick} data-cursor-hover>
            <motion.div 
              className={styles.logoContainer}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image 
                src="/logo.png" 
                alt="Evox Ventures Logo" 
                width={280} 
                height={90} 
                className="object-contain h-12 md:h-16 w-auto filter drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]" 
                priority 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Absolute Centered */}
          <div className={styles.desktopMenu}>
            <div className={styles.linksContainer}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`} 
                    onClick={link.href === '/' ? handleHomeClick : undefined}
                    data-cursor-hover
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className={styles.activePill}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right CTA Area */}
          <div className={styles.ctaContainer}>
            <Button href="/quotation" variant="flagship" className="!py-3 !px-7">
              INITIALIZE PROJECT
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
            data-cursor-hover
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => {
                    setIsOpen(false);
                    if (link.href === '/' && pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10">
                <Button href="/contact" variant="primary" className="w-full justify-between" onClick={() => setIsOpen(false)}>
                  Start a Project <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
