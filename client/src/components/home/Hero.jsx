import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            {/* Using a reliable placeholder video source for demo purposes */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.videoBg}
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-confetti-falling-in-a-party-shot-1318-large.mp4" type="video/mp4" />
            </video>

            <div className={`container ${styles.content}`}>
                <h1 className={styles.title}>
                    Creating <br />
                    <span className={styles.highlight}>Unforgettable Experiences</span>
                </h1>
                <p className={styles.subtitle}>
                    Evox Ventures - Your partner for premium corporate, sports, and social experiences.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/budget-estimator" className="btn btn-primary">
                        Get An Estimate
                    </Link>
                    <Link href="/portfolio" className="btn btn-secondary">
                        View Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
