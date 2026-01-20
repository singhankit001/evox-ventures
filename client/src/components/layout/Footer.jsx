import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <Link href="/" className={styles.logo}>
                            Evox <span className={styles.logoAccent}>Ventures</span>
                        </Link>
                        <p className={styles.description}>
                            Creating unforgettable moments through expert event management and curated experiences.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink} aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
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
