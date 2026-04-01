'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

import { Button } from '@/components/ui/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container max-w-5xl mx-auto">
                <div className={styles.navWrapper}>
                    <div className={styles.navContainer}>
                        <Link href="/" className={styles.logo} data-cursor-hover>
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? { filter: 'drop-shadow(0 0 12px rgba(249,115,22,0.22))' }
                                        : {
                                              filter: [
                                                  'drop-shadow(0 0 8px rgba(249,115,22,0.12))',
                                                  'drop-shadow(0 0 20px rgba(249,115,22,0.38))',
                                                  'drop-shadow(0 0 8px rgba(249,115,22,0.12))',
                                              ],
                                          }
                                }
                                transition={
                                    reduceMotion
                                        ? { duration: 0 }
                                        : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
                                }
                            >
                                <Image
                                    src="/logo.png"
                                    alt="Evox Ventures"
                                    width={280}
                                    height={90}
                                    className={styles.logoImage}
                                    priority
                                    quality={100}
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className={styles.desktopMenu}>
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} className={styles.navLink} data-cursor-hover>
                                    {link.name}
                                </Link>
                            ))}
                            <Button href="/budget-estimator" variant="primary" className="py-2.5 px-6 ml-2 text-xs">
                                Get Quote
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className={styles.mobileToggle}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileNavLink}
                            data-cursor-hover
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        href="/budget-estimator"
                        variant="primary"
                        className={styles.mobileBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        Get Quote
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
