'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './services.module.css';

const servicesFunction = [
    {
        id: 1,
        title: 'Corporate Events',
        description: 'Elevate your brand with meticulously planned corporate events. From high-stakes conferences and shareholder meetings to team-building retreats and gala dinners, we ensure every detail reflects your company’s professionalism and vision.',
        poster: '/images/corporate-poster.jpg'
    },
    {
        id: 2,
        title: 'Sports Management',
        description: 'Passion meets precision. We handle everything from tournament logistics and athlete representation to venue management and fan engagement. Experience sports events that are as seamless as they are thrilling.',
        poster: '/images/sports-poster.jpg'
    },
    {
        id: 3,
        title: 'Social Gatherings',
        description: 'Celebrate life’s special moments with grace and style. Whether it’s an intimate wedding, a milestone birthday, or a grand festive celebration, we curate experiences that bring people together and create cherished memories.',
        poster: '/images/social-poster.jpg'
    },
    {
        id: 4,
        title: 'Travel Tours',
        description: 'Embark on unforgettable journeys with our bespoke travel services. We organize guided tours, adventure trips, and luxury getaways to the world’s most breathtaking destinations, ensuring comfort and discovery at every step.',
        poster: '/images/travel-poster.jpg'
    }
];

export default function ServicesPage() {
    const [activeServiceId, setActiveServiceId] = useState(1);
    const observerRefs = useRef([]);

    useEffect(() => {
        const observers = [];

        servicesFunction.forEach((service, index) => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveServiceId(service.id);
                        }
                    });
                },
                {
                    threshold: 0.5, // Trigger when 50% of the section is visible
                    rootMargin: "-10% 0px -10% 0px"
                }
            );

            if (observerRefs.current[index]) {
                observer.observe(observerRefs.current[index]);
            }
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    return (
        <main className={styles.pageContainer}>
            {/* Fixed Background Layer */}
            <div className={styles.backgroundContainer}>
                {servicesFunction.map((service) => (
                    <div
                        key={`bg-${service.id}`}
                        className={`${styles.backgroundImageWrapper} ${activeServiceId === service.id ? styles.active : ''}`}
                    >
                        <Image
                            src={service.poster}
                            alt={service.title}
                            fill
                            className={styles.videoBg}
                            priority={service.id === 1} // Priority load only the first one
                            quality={100}
                        />
                    </div>
                ))}
                <div className={styles.globalOverlay}></div>
            </div>

            {/* Scrollable Content */}
            {servicesFunction.map((service, index) => (
                <section
                    key={service.id}
                    className={styles.serviceSection}
                    ref={(el) => observerRefs.current[index] = el}
                >
                    <div className={styles.content}>
                        <h2 className={styles.title}>{service.title}</h2>
                        <p className={styles.description}>{service.description}</p>
                        <Link href="/contact" className={styles.ctaButton}>
                            Plan Your Event
                        </Link>
                    </div>
                </section>
            ))}
        </main>
    );
}
