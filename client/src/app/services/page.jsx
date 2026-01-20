import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './services.module.css';

const servicesFunction = [
    {
        id: 1,
        title: 'Corporate Events',
        description: 'Elevate your brand with meticulously planned corporate events. From high-stakes conferences and shareholder meetings to team-building retreats and gala dinners, we ensure every detail reflects your company’s professionalism and vision.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-corporate-office-42750-large.mp4', // Corporate vibe
        poster: '/images/corporate-poster.jpg' // Placeholder if we had one
    },
    {
        id: 2,
        title: 'Sports Management',
        description: 'Passion meets precision. We handle everything from tournament logistics and athlete representation to venue management and fan engagement. Experience sports events that are as seamless as they are thrilling.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-a-track-during-a-sunny-day-1262-large.mp4', // Sports vibe
        poster: '/images/sports-poster.jpg'
    },
    {
        id: 3,
        title: 'Social Gatherings',
        description: 'Celebrate life’s special moments with grace and style. Whether it’s an intimate wedding, a milestone birthday, or a grand festive celebration, we curate experiences that bring people together and create cherished memories.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-friends-with-colored-smoke-bombs-4556-large.mp4', // Party vibe
        poster: '/images/social-poster.jpg'
    },
    {
        id: 4,
        title: 'Travel Tours',
        description: 'Embark on unforgettable journeys with our bespoke travel services. We organize guided tours, adventure trips, and luxury getaways to the world’s most breathtaking destinations, ensuring comfort and discovery at every step.',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4', // Travel/City vibe
        poster: '/images/travel-poster.jpg'
    }
];

export const metadata = {
    title: 'Our Services | Evox Ventures',
    description: 'Explore our premium services: Corporate Events, Sports Management, Social Gatherings, and Travel Tours.',
};

export default function ServicesPage() {
    return (
        <main className={styles.pageContainer}>
            <Navbar />

            {servicesFunction.map((service) => (
                <section key={service.id} className={styles.serviceSection}>
                    <div className={styles.overlay}></div>
                    <Image
                        src={service.poster}
                        alt={service.title}
                        fill
                        className={styles.videoBg}
                        priority
                        quality={100}
                    />

                    <div className={styles.content}>
                        <h2 className={styles.title}>{service.title}</h2>
                        <p className={styles.description}>{service.description}</p>
                        <Link href="/contact" className={styles.ctaButton}>
                            Plan Your Event
                        </Link>
                    </div>
                </section>
            ))}

            <Footer />
        </main>
    );
}
