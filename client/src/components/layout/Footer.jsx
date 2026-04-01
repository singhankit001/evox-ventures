import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import FooterSocials from './FooterSocials';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.glowTop} aria-hidden />
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <Link href="/" className={styles.logo} data-cursor-hover>
                            Evox <span className={styles.logoAccent}>Ventures</span>
                        </Link>
                        <p className={styles.description}>
                            Creating unforgettable moments through expert event management and curated experiences.
                        </p>
                        <form className="mt-6 mb-6 flex rounded-xl border border-white/10 bg-white/5 focus-within:border-orange-500/50 focus-within:ring-1 focus-within:ring-orange-500/50 p-1 w-full max-w-sm">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/40" 
                                required 
                            />
                            <button type="submit" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600">Subscribe</button>
                        </form>
                        <FooterSocials />
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Services</h3>
                        <ul className={styles.links}>
                            <li><Link href="/services">Corporate Events</Link></li>
                            <li><Link href="/services">Sports Management</Link></li>
                            <li><Link href="/services">Social Gatherings</Link></li>
                            <li><Link href="/services">Travel Tours</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Quick Links</h3>
                        <ul className={styles.links}>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/budget-estimator">Get Estimate</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.heading}>Contact Us</h3>
                        <ul className={styles.contactInfo}>
                            <li>
                                <MapPin size={18} className={styles.icon} />
                                <span>Lohegaon, Pune, Maharashtra - 411047</span>
                            </li>
                            <li>
                                <Phone size={18} className={styles.icon} />
                                <span>+91 9545393239</span>
                            </li>
                            <li>
                                <Mail size={18} className={styles.icon} />
                                <span>evoxventures2025@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Evox Ventures. All rights reserved.</p>
                    <div className={styles.legal}>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
