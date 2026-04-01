import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import StatsSection from '@/components/home/StatsSection';
import EventsShowcase from '@/components/home/EventsShowcase';
import TrustedBy from '@/components/home/TrustedBy';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import FinalCta from '@/components/home/FinalCta';

export default function Home() {
    return (
        <>
            <Hero />

            <TrustedBy />

            <ServicesSection />

            <StatsSection />

            <EventsShowcase />

            <TestimonialsCarousel />

            <FinalCta />
        </>
    );
}
